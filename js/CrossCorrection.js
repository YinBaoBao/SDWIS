/**
 * 交叉订正
 * Created by allen_000 on 2015/12/15.
 */
function CrossCorrection() {
    this.cal = function (recall, element, elementTarget) {
        var numX = 0;
        var numY = 0;
        try {
            var t = this;
            var dataCache = GDYB.GridProductClass.dataCache;
            var makeTime = GDYB.GridProductClass.currentMakeTime;
            var version = GDYB.GridProductClass.currentVersion;
            var currentDateTime = GDYB.GridProductClass.currentDateTime;

            //恢复（一致性）合理性
            var relation = getCrossRelation(element, elementTarget);
            relation.reasonable = true;
            if (element == "tmin" || element == "tmax") {
                relation = getCrossRelation(element == "tmin" ? "tmax" : "tmin", "2t");
                relation.reasonable = true;
            }
            if (elementTarget == "tmin" || elementTarget == "tmax") {
                relation = getCrossRelation("2t", elementTarget == "tmin" ? "tmax" : "tmin");
                relation.reasonable = true;
            }

            function getCrossRelation(src, target) {
                var result = null;
                for (var key in CrossRelation) {
                    var relation = CrossRelation[key];
                    if (relation.src == src && relation.target == target) {
                        result = relation;
                        break;
                    }
                }
                return result;
            }

            //拆分（逐日-->逐时）
            if ((element == "r12" || element == "tmax" || element == "tmin" || element == "wmax") && (elementTarget == "r3" || elementTarget == "2t" || elementTarget == "10uv"))
            {
                var dataCacheElement = dataCache.getData(makeTime, version, currentDateTime, element);
                if (dataCacheElement == null || dataCacheElement.length == 0) {
                    recall && recall();
                    return;
                }

                if(element == "tmax" || element == "tmin"){
                    var dataCacheInitMax = GDYB.GridProductClass.dataCacheInit.getData(makeTime, version, currentDateTime, "tmax");
                    var dataCacheInitMin = GDYB.GridProductClass.dataCacheInit.getData(makeTime, version, currentDateTime, "tmin");
                    if (dataCacheInitMax == null || dataCacheInitMax.length == 0 || dataCacheInitMin == null || dataCacheInitMin.length == 0) {
                        recall && recall();
                        return;
                    }
                }

                //遍历源数据各时效
                var hourspans = t.getHourSpan(element);
                var dataCacheInitMaxs = GDYB.GridProductClass.dataCacheInit.getData(makeTime, version, currentDateTime, "tmax");
                var dataCacheInitMins = GDYB.GridProductClass.dataCacheInit.getData(makeTime, version, currentDateTime, "tmin");
                numX = hourspans.length;
                for (var key in hourspans) {
                    var hour = hourspans[key];
                    crossEachHourData1(hour,key);
                }
                function crossEachHourData1(hour,key){
                    dataCache.getData(makeTime, version, currentDateTime, element, hour,function(dataCacheHourSpan){
                        if (dataCacheHourSpan == null || dataCacheHourSpan.data == null){
                            callback();
                            return;
                        }

                        var dg = dataCacheHourSpan.data;

                        var bMaxTemp = false;
                        var dgAnother = null;

                        var cols = dg.cols;
                        var rows = dg.rows;
                        //2.确定时效范围
                        var hourSpan = 1; //以最小时效1小时去查找吧，同时解决时效不等的情况
                        var hourSpanStart = Number(key) == 0 ? hourSpan : hourspans[Number(key) - 1] + hourSpan;
                        var hourSpanEnd = hour;
                        //3.遍历各时效，记录所有的目标数据集
                        var arrayDataset = [];
                        var arrayHours = [];
                        var h = hourSpanStart;
                        var targetCaches = dataCache.getData(makeTime, version, currentDateTime, elementTarget);

                        if (element == "tmax" || element == "tmin") {
                            getAnotherGrid();
                        }
                        else{
                            getEachTargetGrid(h);
                        }
                        function getAnotherGrid(){
                            bMaxTemp = element == "tmax";
                            var elementAnother = bMaxTemp ? "tmin" : "tmax";
                            dataCache.getData(makeTime, version, currentDateTime, elementAnother, hour, function(dataCacheHourSpan){
                                if (dataCacheHourSpan == null || dataCacheHourSpan.data == null) {
                                    console.error("请先下载要素：" + elementTargetAnother);
                                    callback();
                                    return;
                                }
                                dgAnother = dataCacheHourSpan.data;
                                getEachTargetGrid(h);
                            });
                        }

                        function getEachTargetGrid(h){
                            if(typeof (targetCaches[h]) != "undefined"){
                                dataCache.getData(makeTime, version, currentDateTime, elementTarget, h, function(dataCacheHourSpan){
                                    if (dataCacheHourSpan != null && dataCacheHourSpan.data != null) {
                                        if (dataCacheHourSpan.data.cols == cols && dataCacheHourSpan.data.rows == rows) {
                                            arrayDataset.push(dataCacheHourSpan.data);
                                            arrayHours.push(h);
                                        }
                                        else
                                            alert("目标场与参考场行列数不一致");
                                    }
                                    h += hourSpan;
                                    if(h>hourSpanEnd){
                                        crossDetail();
                                        return;
                                    }
                                    getEachTargetGrid(h);
                                });
                            }
                            else{
                                h += hourSpan;
                                if(h>hourSpanEnd){
                                    crossDetail();
                                    return;
                                }
                                getEachTargetGrid(h);
                            }
                        }

                        function crossDetail(){
                            //3.计算累计值，存到数组中
                            var arryTotalValues = [];
                            if (elementTarget == "r3") {
                                for (var i = 0; i < rows; i++) {
                                    var arrayTotalValueRow = [];
                                    for (var j = 0; j < cols; j++) {
                                        var dValueTotal = 0.0;
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue && dValueTemp >= 0)
                                                dValueTotal += dValueTemp;
                                        }
                                        arrayTotalValueRow.push(dValueTotal);
                                    }
                                    arryTotalValues.push(arrayTotalValueRow);
                                }
                            }

                            //3.计算极值，存到数组中
                            var noDataValue = dg.noDataValue;
                            var noDataValueABS = Math.abs(noDataValue);
                            var arryMinValues = [];
                            var arryMaxValues = [];
                            var arrayMinDataset = null; //极小值出现的数据集索引
                            var arrayMaxDataset = null; //极大值出现的数据集索引
                            if (elementTarget == "2t" || elementTarget == "10uv") {
                                for (var i = 0; i < rows; i++) {
                                    var arryMinValuesRow = [];
                                    var arryMaxValuesRow = [];
                                    var arrayMinDatasetRow = null;
                                    var arrayMaxDatasetRow = null;
                                    if(elementTarget == "2t"){
                                        if(arrayMinDataset == null)
                                            arrayMinDataset = [];
                                        if(arrayMaxDataset == null)
                                            arrayMaxDataset = [];
                                        arrayMinDatasetRow = [];
                                        arrayMaxDatasetRow = [];
                                    }
                                    for (var j = 0; j < cols; j++) {
                                        var dValueMax = noDataValueABS * -1;
                                        var dValueMin = noDataValueABS;
                                        var nDatasetMax = -1;
                                        var nDatasetMin = -1;
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue) {
                                                if (dValueTemp > dValueMax){
                                                    dValueMax = dValueTemp;
                                                    nDatasetMax = dd;
                                                }
                                                if (dValueTemp < dValueMin){
                                                    dValueMin = dValueTemp;
                                                    nDatasetMin = dd;
                                                }
                                            }
                                        }
                                        if (Math.abs(dValueMin) == noDataValueABS)
                                            arryMinValuesRow.push(noDataValue);
                                        else
                                            arryMinValuesRow.push(dValueMin);
                                        if (Math.abs(dValueMax) == noDataValueABS)
                                            arryMaxValuesRow.push(noDataValue);
                                        else
                                            arryMaxValuesRow.push(dValueMax);
                                        if(elementTarget == "2t"){
                                            arrayMinDatasetRow.push(nDatasetMin);
                                            arrayMaxDatasetRow.push(nDatasetMax);
                                        }
                                    }
                                    arryMinValues.push(arryMinValuesRow);
                                    arryMaxValues.push(arryMaxValuesRow);
                                    if(elementTarget == "2t"){
                                        arrayMinDataset.push(arrayMinDatasetRow);
                                        arrayMaxDataset.push(arrayMaxDatasetRow);
                                    }
                                }
                            }

                            //4.对于气温，先订正逐24小时里面8个时次中最大和最小那个，其它时次在后面按趋势订正
                            if(elementTarget == "2t"){
                                for (var i = 0; i < rows; i++) {
                                    for (var j = 0; j < cols; j++) {
                                        var nMaxDatasetIndex = arrayMaxDataset[i][j];
                                        var nMinDatasetIndex = arrayMinDataset[i][j];
                                        var dgTargetMax = arrayDataset[nMaxDatasetIndex];
                                        var dgTargetMin = arrayDataset[nMinDatasetIndex];
                                        var dValueMax = dgTargetMax.getValue(0, j, i);
                                        var dValueMin = dgTargetMin.getValue(0, j, i);
                                        var maxTemp = bMaxTemp ? dg.getValue(0, j, i) : dgAnother.getValue(0, j, i);
                                        var minTemp = bMaxTemp ? dgAnother.getValue(0, j, i) : dg.getValue(0, j, i);
                                        var dataCacheInitMax = dataCacheInitMaxs[hour];
                                        var dataCacheInitMin = dataCacheInitMins[hour];
                                        if(dataCacheInitMax == null || dataCacheInitMax.data == null || dataCacheInitMin == null || dataCacheInitMin.data == null)
                                            continue;
                                        var maxTempSrc = dataCacheInitMax.data.getValue(0, j, i);
                                        var minTempSrc = dataCacheInitMin.data.getValue(0, j, i);
                                        //if(maxTemp != maxTempSrc)
                                        {
                                            if(dValueMax > maxTemp)
                                                dValueMax = maxTemp;
                                            else if(maxTemp != maxTempSrc){
                                                dValueMax += (maxTemp - maxTempSrc);
                                                if(dValueMax < minTemp)
                                                    dValueMax = minTemp;
                                            }
                                            dgTargetMax.setValue(0, j, i, Math.round(dValueMax*10)/10);
                                        }
                                        //if(minTemp != minTempSrc)
                                        {
                                            if(dValueMin < minTemp)
                                                dValueMin = minTemp;
                                            else
                                            {
                                                dValueMin += (minTemp - minTempSrc);
                                                if(dValueMin > maxTemp)
                                                    dValueMin = maxTemp;
                                            }
                                            dgTargetMin.setValue(0, j, i, Math.round(dValueMin*10)/10);
                                        }
                                    }
                                }


                                //将当前替换为初始场
                                GDYB.GridProductClass.dataCache.getData(makeTime, version, currentDateTime, element, hour, function(dc){
                                    if(dc != null && dc.data != null) {
                                        var dgClone = GDYB.GridProductClass.dataStack.clone(dc.data);
                                        GDYB.GridProductClass.dataCacheInit.addData(makeTime, version, currentDateTime, element, hour, dgClone, 0);
                                    }
                                });
                            }

                            //4.记录 超过（极值调整后的值）的全部异常数据集索引，二维数组
                            var arrayOutMaxDataset = [];
                            var arrayOutMinDataset = [];
                            if (elementTarget == "2t") {
                                for (var i = 0; i < rows; i++) {
                                    var arrayOutMaxDatasetRow = [];
                                    var arrayOutMinDatasetRow = [];
                                    for (var j = 0; j < cols; j++) {
                                        var arrayOutMaxDatasetCell = [];
                                        var arrayOutMinDatasetCell = [];
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue) {

                                                var nMaxDatasetIndex = arrayMaxDataset[i][j];
                                                var nMinDatasetIndex = arrayMinDataset[i][j];
                                                var dgTargetMax = arrayDataset[nMaxDatasetIndex];
                                                var dgTargetMin = arrayDataset[nMinDatasetIndex];
                                                var dValueMax = dgTargetMax.getValue(0, j, i);
                                                var dValueMin = dgTargetMin.getValue(0, j, i);

                                                if(dValueTemp >= dValueMax)
                                                    arrayOutMaxDatasetCell.push(dd);
                                                if(dValueTemp <= dValueMin)
                                                    arrayOutMinDatasetCell.push(dd);
                                            }
                                        }

                                        arrayOutMaxDatasetRow.push(arrayOutMaxDatasetCell);
                                        arrayOutMinDatasetRow.push(arrayOutMinDatasetCell);
                                    }
                                    arrayOutMaxDataset.push(arrayOutMaxDatasetRow);
                                    arrayOutMinDataset.push(arrayOutMinDatasetRow);
                                }
                            }

                            //4.遍历所有目标数据集，更新格点值
                            if (arrayDataset.length > 0) {
                                for (var d = 0; d < arrayDataset.length; d++) {
                                    var dgTarget = arrayDataset[d];
                                    if (dgTarget != null) {
                                        for (var i = 0; i < rows; i++) {
                                            if (true) {
                                                for (var j = 0; j < cols; j++) {
                                                    //5.获取当前值
                                                    var dValue = dgTarget.getValue(0, j, i);
                                                    //降水
                                                    if (elementTarget == "r3") {
                                                        var dValueSrc = dg.getValue(0, j, i);
                                                        if (dValueSrc == dg.noDataValue || dValue == dgTarget.noDataValue) //如果日雨量为无效值，或者当前格点没有降水，则不订正逐时雨量
                                                        {
                                                        }
                                                        else if (dValue == 0.0) {
                                                            var dValueTotal = arryTotalValues[i][j];
                                                            if (dValueTotal == 0.0) {
                                                                dgTarget.setValue(0, j, i, Math.round(dValueSrc / arrayDataset.length * 10.0) / 10.0); //如果逐3小时降水都为0，则均分12小时降水
                                                            }
                                                        }
                                                        else {
                                                            var dValueTotal = arryTotalValues[i][j];
                                                            if (dValueTotal == 0.0) //如果都没有降水
                                                            {
                                                            }
                                                            else {
                                                                if (dValueSrc != dValueTotal) //如果它们相同，原则上说明没有订正过，无需计算。从数学角度看，也无需计算
                                                                {
                                                                    //dgTarget.setValue(0, j, i, Math.floor(dValueSrc * dValue / dValueTotal * 10.0) / 10.0); //7.计算目标值，并赋值
                                                                    dgTarget.setValue(0, j, i, Math.round(dValueSrc * dValue / dValueTotal * 10.0) / 10.0); //7.计算目标值，并赋值
                                                                }
                                                            }
                                                        }
                                                    }
                                                    //气温
                                                    else if (elementTarget == "2t") {
                                                        var dgMax = arrayDataset[arrayMaxDataset[i][j]];
                                                        var dgMin = arrayDataset[arrayMinDataset[i][j]];
                                                        var maxTemp = dgMax.getValue(0, j, i);
                                                        var minTemp = dgMin.getValue(0, j, i);

//                                                        if((d == arrayMaxDataset[i][j] || d == arrayMinDataset[i][j])
//                                                            || ((Math.abs(d - (bMaxTemp?arrayMaxDataset[i][j]:arrayMinDataset[i][j]))>1) && (dValue < maxTemp))) //如果是高温，只订正出现极大值的时次相邻的两个时次，同理
//                                                            continue;

                                                        if((d == arrayMaxDataset[i][j] || d == arrayMinDataset[i][j]))
                                                            continue;

                                                        var needModify = false;
                                                        arrayOutMaxDataset.push(arrayOutMaxDatasetRow);
                                                        arrayOutMinDataset.push(arrayOutMinDatasetRow);
                                                        if(arrayOutMaxDataset[i][j].length == 1 && ((Math.abs(d - arrayMaxDataset[i][j]))==1)) //如果没有大于极值的，只订正出现极大值的时次相邻的两个时次
                                                            needModify = true;
                                                        if(arrayOutMinDataset[i][j].length == 1 && ((Math.abs(d - arrayMinDataset[i][j]))==1)) //如果没有大于极值的，只订正出现极大值的时次相邻的两个时次
                                                            needModify = true;

                                                        if(arrayOutMaxDataset[i][j].length > 1 && (arrayOutMaxDataset[i][j][0] <= d && d <= arrayOutMaxDataset[i][j][arrayOutMaxDataset[i][j].length - 1])) //在区间
                                                            needModify = true;
                                                        if(arrayOutMinDataset[i][j].length > 1 && (arrayOutMinDataset[i][j][0] <= d && d <= arrayOutMinDataset[i][j][arrayOutMinDataset[i][j].length - 1])) //在区间
                                                            needModify = true;

                                                        if(!needModify)
                                                            continue;

//                                                        var maxTemp = bMaxTemp ? dg.getValue(0, j, i) : dgAnother.getValue(0, j, i);
//                                                        var minTemp = bMaxTemp ? dgAnother.getValue(0, j, i) : dg.getValue(0, j, i);
                                                        if (dValue == dgTarget.noDataValue || minTemp == dgTarget.noDataValue || maxTemp == dgTarget.noDataValue) //如果气温为无效值，则不订正
                                                        {

                                                        }
                                                        else {
                                                            if (minTemp == maxTemp) //如果最高温等于最低温，直接赋值
                                                            {
                                                                dgTarget.setValue(0, j, i, minTemp);
                                                            }
                                                            else {
                                                                var dValueMax = arryMaxValues[i][j];
                                                                var dValueMin = arryMinValues[i][j];
                                                                if (dValueMin == dValueMax) //如果极大值等于极小值，如何处理？
                                                                {
                                                                    dgTarget.setValue(0, j, i, minTemp);
                                                                }
                                                                else {
                                                                    var x = (dValue * (maxTemp - minTemp) - dValueMin * maxTemp + minTemp * dValueMax) / (dValueMax - dValueMin); //7.计算目标值
                                                                    dgTarget.setValue(0, j, i, Math.round(x * 10.0) / 10.0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    //alter by pope on 20161029 订正日最大风后，3小时的风按风向相近（距左右30度）的最大值=日最大风,大于日最大风的其它风速值改为<=日最大风
                                                    else if (elementTarget == "10uv") {
                                                        var dValueMax = arryMaxValues[i][j];
                                                        var dValueMin = arryMinValues[i][j];
                                                        var maxWind = dg.getValue(0, j, i);
                                                        var minWind = dValueMin;
                                                        var maxWindDiretion = dg.getValue(1, j, i); //最大风速风向
                                                        var targetWindDiretion = dgTarget.getValue(1, j, i);//目标风速风向
                                                        if (dValue == dgTarget.noDataValue) {

                                                        }
                                                        else {
                                                            if(Math.abs(maxWindDiretion-targetWindDiretion)<=30 && dValue == dValueMax){
                                                                dgTarget.setValue(0, j, i, maxWind);
                                                                dgTarget.setValue(1, j, i, maxWindDiretion);
                                                            }
                                                            else {
                                                                if( dValue > maxWind && dValueMax != dValueMin){ //大于日最大风的其它风速值改为<=日最大风
                                                                    var x = (dValue * (maxWind - dValueMin) - dValueMin * maxWind + dValueMin * dValueMax) / (dValueMax - dValueMin); //7.计算目标值
                                                                    dgTarget.setValue(0, j, i, Math.round(x * 10.0) / 10.0);
                                                                }
                                                            }

                                                            //if (minWind == maxWind) //如果最大风等于最小风，直接赋值
                                                            //{
                                                            //    dgTarget.setValue(0, j, i, maxWind);
                                                            //    dgTarget.setValue(1, j, i, maxWindDiretion);
                                                            //}
                                                            //else {
                                                            //    if (dValueMin == dValueMax) //如果极大值等于极小值，如何处理？
                                                            //    {
                                                            //        dgTarget.setValue(0, j, i, maxWind);
                                                            //        dgTarget.setValue(1, j, i, maxWindDiretion);
                                                            //    }
                                                            //    else {
                                                            //        var x = (dValue * (maxWind - minWind) - dValueMin * maxWind + minWind * dValueMax) / (dValueMax - dValueMin); //7.计算目标值
                                                            //        dgTarget.setValue(0, j, i, Math.round(x * 10.0) / 10.0);
                                                            //    }
                                                            //}
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, arrayHours[d], 1,dgTarget);
                                }
                            }
                            callback();
                        }
                    });
                }
            }
            //组合（逐时-->逐日）
            else if ((element == "r3" || element == "2t" || element == "10uv") && (elementTarget == "r12" || elementTarget == "tmax" || elementTarget == "tmin" || elementTarget == "wmax"))
            {
                var elementTargetAnother = null;
                if (element == "2t") {
                    elementTarget = "tmax";
                    elementTargetAnother = "tmin";
                }

                var dataCacheElement = dataCache.getData(makeTime, version, currentDateTime, element);
                if (dataCacheElement == null || dataCacheElement.length == 0) {
                    recall && recall();
                    return;
                }

                //遍历目标数据各时效，注意这里是“目标数据”！！！
                var hourspans = t.getHourSpan(elementTarget);
                numX = hourspans.length;
                for (var key in hourspans) {
                    var hour = hourspans[key];
                    crossEachHourData2(hour,key);
                }
                function crossEachHourData2(hour,key){
                    dataCache.getData(makeTime, version, currentDateTime, elementTarget, hour, function(dataCacheHourSpanTarget){
                        if (dataCacheHourSpanTarget == null || dataCacheHourSpanTarget.data == null){
                            callback();
                            return;
                        }
                        var dgTarget = dataCacheHourSpanTarget.data;
                        var cols = dgTarget.cols;
                        var rows = dgTarget.rows;

                        //2.确定时效范围
                        var hourSpan = 1; //以最小时效1小时去查找吧，同时解决时效不等的情况
                        var hourSpanStart = Number(key) == 0 ? hourSpan : hourspans[Number(key) - 1] + hourSpan;
                        var hourSpanEnd = hour;
                        //3.遍历各时效，记录所有的源数据集，注意这里是“源数据集”！！！
                        var arrayDataset = [];
                        var arrayHours = [];
                        var h = hourSpanStart;
                        var sourceCaches = dataCache.getData(makeTime, version, currentDateTime, element);

                        var dgTargetAnother = null;
                        if(elementTarget == "tmax" || elementTarget == "tmin"){
                            getAnotherGrid();
                        }
                        else{
                            getEachSourceGrid(h);
                        }
                        function getAnotherGrid(){
                            dataCache.getData(makeTime, version, currentDateTime, elementTargetAnother, hour,function(dataCacheHourSpan){
                                if(dataCacheHourSpan == null || dataCacheHourSpan.data == null)
                                {
                                    console.error("请先下载要素：" + elementTargetAnother);
                                    callback();
                                    return;
                                }
                                dgTargetAnother = dataCacheHourSpan.data;
                                getEachSourceGrid(h);
                            });
                        }

                        function getEachSourceGrid(h) {
                            if(typeof (sourceCaches[h]) != "undefined"){
                                dataCache.getData(makeTime, version, currentDateTime, element, h, function(dataCacheHourSpan){
                                    if (dataCacheHourSpan != null && dataCacheHourSpan.data != null) {
                                        if (dataCacheHourSpan.data.cols == cols && dataCacheHourSpan.data.rows == rows)
                                            arrayDataset.push(dataCacheHourSpan.data);
                                        else
                                            alert("交叉订正：目标场与参考场行列数不一致");
                                    }
                                    h += hourSpan;
                                    if(h>hourSpanEnd){
                                        crossDetail();
                                        return;
                                    }
                                    getEachSourceGrid(h);
                                });
                            }
                            else{
                                h += hourSpan;
                                if(h>hourSpanEnd){
                                    crossDetail();
                                    return;
                                }
                                getEachSourceGrid(h);
                            }
                        }

                        function crossDetail(){
                            //3.计算累计值
                            if (element == "r3") {
                                for (var i = 0; i < rows; i++) {
                                    for (var j = 0; j < cols; j++) {
                                        var dValueTotal = 0.0;
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue && dValueTemp >= 0)
                                                dValueTotal += dValueTemp;
                                        }
                                        dgTarget.setValue(0, j, i, Math.round(dValueTotal * 10) / 10);
                                    }
                                }
                                dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, hour, 1,dgTarget);
                            }

                            //3.计算极值
                            var noDataValue = dgTarget.noDataValue;
                            var noDataValueABS = Math.abs(noDataValue); //取其绝对值
                            var bwind = element == "10uv";
                            //alter by pope on 20161029 订正3小时风后，日最大风=3小时次的最大风时次
                            if (element == "2t" || element == "10uv") {
                                var another = false;
                                for (var i = 0; i < rows; i++) {
                                    for (var j = 0; j < cols; j++) {
                                        var dValueMax = noDataValueABS * -1;
                                        var dValueMaxWindDirection = noDataValue;
                                        var dValueMin = noDataValueABS;
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue) {
                                                if (dValueTemp > dValueMax) {
                                                    dValueMax = dValueTemp;
                                                    if (bwind)
                                                        dValueMaxWindDirection = dgTemp.getValue(1, j, i);
                                                }
                                                if (dValueTemp < dValueMin)
                                                    dValueMin = dValueTemp;
                                            }
                                        }
                                        if(element == "10uv"){
                                            //dgTarget.setValue(0, j, i, Math.round(dValueMax * 10) / 10); //	把数四舍五入为最接近的整数。
                                            var dValueSrc = dgTarget.getValue(0, j, i);
                                            if(dValueSrc < dValueMax)
                                                dgTarget.setValue(0, j, i, Math.round(dValueMax * 10) / 10);
                                        }
                                        else if(element == "2t"){
                                            var dValueSrc = dgTarget.getValue(0, j, i);
                                            if(dValueSrc < dValueMax)
                                                dgTarget.setValue(0, j, i, Math.round(dValueMax * 10) / 10);
                                        }
                                        if (bwind)
                                            dgTarget.setValue(1, j, i, dValueMaxWindDirection);
                                        if (dgTargetAnother != null) {
                                            if(element == "10uv"){
                                                dgTargetAnother.setValue(0, j, i, Math.round(dValueMin * 10) / 10);
                                                another = true;
                                            }
                                            else if(element == "2t"){
                                                var dValueSrc = dgTargetAnother.getValue(0, j, i);
                                                if(dValueSrc > dValueMin){
                                                    dgTargetAnother.setValue(0, j, i, Math.round(dValueMin * 10) / 10);
                                                    another = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, hour, 1,dgTarget);
                                if(another)
                                    dataCache.setDataStatus(makeTime, version, currentDateTime, elementTargetAnother, hour, 1,dgTargetAnother);
                            }

                            //将当前替换为初始场
                            if(element == "2t"){
                                var dgClone = GDYB.GridProductClass.dataStack.clone(dgTarget);
                                GDYB.GridProductClass.dataCacheInit.addData(makeTime, version, currentDateTime, elementTarget, hour, dgClone, 0);
                                if(another){
                                    var dgAnotherClone = GDYB.GridProductClass.dataStack.clone(dgTargetAnother);
                                    GDYB.GridProductClass.dataCacheInit.addData(makeTime, version, currentDateTime, elementTargetAnother, hour, dgAnotherClone, 0);
                                }
                            }
                            callback();
                        }
                    });
                }
            }

            if (element == "r3" && elementTarget == "tcc") {  //时效相同的要素间交叉订正，3小时降水量-->总云量
                var elementR3 = "r3";
//            var elementTarget = "tcc";
                var dataCacheElement = dataCache.getData(makeTime, version, currentDateTime, elementTarget);
                //遍历目标源数据各时效
                var hourspans = t.getHourSpan(elementTarget);
                numX = hourspans.length;
                for (var key in hourspans) {
                    var hour = hourspans[key];
                    crossEachHourData3(hour,key);
                }
                function crossEachHourData3(hour,key){
                    dataCache.getData(makeTime, version, currentDateTime, elementTarget, hour, function(dataCacheHourSpanTCC){
                        if (dataCacheHourSpanTCC == null || dataCacheHourSpanTCC.data == null){
                            callback();
                            return;
                        }
                        var dgTCC = dataCacheHourSpanTCC.data;

                        dataCache.getData(makeTime, version, currentDateTime, elementR3, hour, function(dataCacheHourSpanR3){
                            callback();
                            if (dataCacheHourSpanR3 == null || dataCacheHourSpanR3.data == null)
                                return;
                            var dgR3 = dataCacheHourSpanR3.data;
                            var noDataValue = dgR3.noDataValue;


                            var rows = dgTCC.rows;
                            var cols = dgTCC.cols;
                            var rowsR3 = dgR3.rows;
                            var colsR3 = dgR3.cols;
                            for (var i = 0; i < rows; i++) {
                                if (i >= rowsR3)
                                    continue;
                                for (var j = 0; j < cols; j++) {
                                    if (j >= colsR3)
                                        continue;
                                    var r3 = dgR3.getValue(0, j, i);
                                    if (r3 != noDataValue && r3 > 0)
                                        dgTCC.setValue(0, j, i, 100);
                                }
                            }
                            dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, hour, 1,dgTCC);
                        });
                    });
                }
            }

            if ((element == "tcc" || element == "r12") && elementTarget == "w") {  //时效相同的要素间交叉订正，总云量、天气现象-->天气现象
                var elementTCC = "tcc";
                var elementR12 = "r12";
//            var elementTarget = "w";
                var dataCacheElement = dataCache.getData(makeTime, version, currentDateTime, elementTarget);
                //遍历目标源数据各时效
                var hourspans = t.getHourSpan(element);
                var month = new Date().getMonth() + 1;
                numX = hourspans.length;
                for (var key in hourspans) {
                    var hour = hourspans[key];
                    crossEachHourData4(hour,key);
                }
                function crossEachHourData4(hour,key){
                    dataCache.getData(makeTime, version, currentDateTime, elementTarget, hour, function(dataCacheHourSpanWeather){
                        if (dataCacheHourSpanWeather == null || dataCacheHourSpanWeather.data == null){
                            callback();
                            return;
                        }
                        var dgWeather = dataCacheHourSpanWeather.data;
                        var noDataValue = dgWeather.noDataValue;

                        dataCache.getData(makeTime, version, currentDateTime, elementTCC, hour, function(dataCacheHourSpanTCC){
                            if (dataCacheHourSpanTCC == null || dataCacheHourSpanTCC.data == null){
                                callback();
                                return;
                            }
                            var dgTCC = dataCacheHourSpanTCC.data;

                            dataCache.getData(makeTime, version, currentDateTime, elementR12, hour, function(dataCacheHourSpanR12){
                                callback();
                                if (dataCacheHourSpanR12 == null || dataCacheHourSpanR12.data == null)
                                    return;
                                var dgR12 = dataCacheHourSpanR12.data;

                                var hasTag = typeof(dgR12.tag) != "undefined";
                                var tag = null;

                                var rows = dgWeather.rows;
                                var cols = dgWeather.cols;
                                for (var i = 0; i < rows; i++) {
                                    for (var j = 0; j < cols; j++) {
                                        var r12 = dgR12.getValue(0, j, i);
                                        var tcc = dgTCC.getValue(0, j, i);
                                        if (hasTag)
                                            tag = dgR12.tag[i][j];
                                        var w = getWeatherCode(noDataValue, r12, tcc, tag, month);
                                        dgWeather.setValue(0, j, i, w);
                                    }
                                }
                                dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, hour, 1,dgWeather);
                            });
                        });
                    });
                }

                function getWeatherCode(noDataValue, dValueR12, dValueTCC, tag, month) {
                    var dValueTarget = noDataValue;
                    if (dValueR12 != noDataValue && dValueR12 > 0) {
                        if (tag == null || tag == noDataValue || tag == 0) //雨量转换天气现象（按24小时标准），tag=1是雪，tag=0是缺省降水
                        {
                            if (dValueR12 < 10.0) //小雨量级
                            {
                                if (month < 5 || month > 9)
                                    dValueTarget = 7.0; //小雨
                                else
                                    dValueTarget = 3.0; //阵雨
                            }
                            else if (dValueR12 < 25.0) //中雨量级
                                dValueTarget = 8.0;
                            else if (dValueR12 < 50.0) //大雨量级
                                dValueTarget = 9.0;
                            else if (dValueR12 < 100.0) //暴雨量级
                                dValueTarget = 10.0;
                            else if (dValueR12 < 250.0) //大暴雨量级
                                dValueTarget = 11.0;
                            else //特大暴雨
                                dValueTarget = 12.0;
                        }
                        else if (tag == 1) //降雪转换天气现象（按24小时标准），tag=1是雪，tag=0是缺省降水
                        {
                            if (dValueR12 < 2.5)        //小雪
                                dValueTarget = 14.0;
                            else if (dValueR12 < 5.0)   //中雪
                                dValueTarget = 15.0;
                            else if (dValueR12 < 10.0)  //大雪
                                dValueTarget = 16.0;
                            else                        //暴雪（天气现象没有大暴雪和特大暴雪）
                                dValueTarget = 17.0;
                        }
                        else if (tag == 2) {
                            dValueTarget = 3.0; //阵雨
                        }
                        else if (tag == 3) {
                            dValueTarget = 4.0; //雷阵雨
                        }
                        else if (tag == 4) {
                            dValueTarget = 5.0; //冰雹
                        }
                        else if (tag == 5) {
                            dValueTarget = 6.0; //雨夹雪
                        }
                        else if (tag == 6) {
                            dValueTarget = 13.0; //阵雪
                        }
                        else if (tag == 7) {
                            dValueTarget = 19.0; //冻雨
                        }
                    }
                    else { //否则根据总云量换算，晴0=[0-30]，多云1=(30,70]，阴2=(70-100]
                        if (dValueTCC != noDataValue) {
                            if (dValueTCC > 70.0) {
                                if (month < 6 || month > 9) //注意，夏天广西为1（多云），甘肃为2（阴）
                                    dValueTarget = 2.0;
                                else
                                    dValueTarget = 1.0;
                            }
                            else if (dValueTCC > 30.0)
                                dValueTarget = 1.0;
                            else
                                dValueTarget = 0.0;
                        }
                    }
                    return dValueTarget;
                }
            }

            //tmax-日最高温,tmin-日最低温,2t-气温,
            //r12-日降水量,r3-降水量,,rh-相对湿度
            //wmax-日最大风,10uv-风,
            //w-天气现象,air-空气污染等级,tcc-云量,vis-能见度
            //add by pope on 20161029 雨量和相对湿度关联，>=中雨时，相对湿度低于80的，提到75-80
            if (element == "r3" && elementTarget == "rh") {
                var elementR3 = "r3";
                var elementRH = "rh";
                //遍历目标源数据各时效
                var hourspans = t.getHourSpan(element);
                numX = hourspans.length;
                for (var key in hourspans) {
                    var hour = hourspans[key];
                    crossEachHourData5(hour,key);
                }
                function crossEachHourData5(hour,key){
                    dataCache.getData(makeTime, version, currentDateTime, elementR3, hour, function(dataCacheHourSpanR3){
                        if (dataCacheHourSpanR3 == null || dataCacheHourSpanR3.data == null){
                            callback();
                            return;
                        }
                        var dgR3 = dataCacheHourSpanR3.data; //降水量

                        dataCache.getData(makeTime, version, currentDateTime, elementRH, hour, function(dataCacheHourSpanRH){
                            callback();
                            if (dataCacheHourSpanRH == null || dataCacheHourSpanRH.data == null)
                                return;
                            var dgRH = dataCacheHourSpanRH.data; //相对湿度

                            var rows = dgRH.rows;
                            var cols = dgRH.cols;
                            for (var i = 0; i < rows; i++) {
                                for (var j = 0; j < cols; j++) {
                                    var dValueRH = dgRH.getValue(0, j, i);
                                    var dValueR3 = dgR3.getValue(0, j, i);
                                    if (dValueR3 >= 25.0) //中雨量级
                                    {
                                        if(dValueRH < 80){ //相对湿度低于80的，提到75-80。
                                            var dValueTarget = 80;
                                            dgRH.setValue(0, j, i, dValueTarget);
                                        }
                                    }
                                }
                            }
                            dataCache.setDataStatus(makeTime, version, currentDateTime, elementTarget, hour, 1,dgRH);
                        });
                    });
                }
            }
        }
        catch(e){
            //console.log("交叉订正：" + elementSrc+"-->"+element+" 一致");
            alert(e.message);
        }
        function callback(){
            numY++;
            if(numX == numY){
                recall&&recall();
            }
            return;
        }
    };

    this.getHourSpan = function(element){
        return GDYB.GDYBPage.getHourSpan(element);
    };
}