const XLSX = require('xlsx');
const _file = {};
const path = require('path');
const fs = require('fs');

_file.GetExcelData = async (req, res) => {

    try {

        const body = req.body;
        const name = body.name;
        const excelFile = XLSX.readFile(name);
        const excelSheet = excelFile.SheetNames;

        const excelData = XLSX.utils.sheet_to_json(excelFile.Sheets[excelSheet[0]]);

        res.json({
            Ok: true,
            excelData
        })

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }

};

_file.PushExcelData = async (req , res) =>{
    try {

        const body = req.boby;
        const option = body.option;
        const dataArry = body.dataArry;

        if(typeof dataArry != 'Array'){

            switch(option){
                case 'Buque': {}break;
                case 'Carga': {}break;
                case 'Company': {}break;
                case 'Contenedor': {}break;
                case 'Product': {}break;
            }

        }
        
    } catch (err) {
        res.status(400).json({
            Ok:false,
            err
        });
    }
};

_file.DownloadExcelFile = async (req , res) =>{
    try {

        const body = req.body;
        const wb =XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(body.data);
        XLSX.utils.book_append_sheet(wb , workSheet , 'Sheet1');
        const public = path.resolve(__dirname , '../public/excel/text.xlsx');
        const workBookFormat = XLSX.write(wb, { type: 'binary', bookType: 'xlsx', bookSST: false });
        fs.writeFileSync(public, workBookFormat , {encoding:'binary'});
        
        

        res.json({
            Ok: true,
            message: 'Download Successfully',
            public

        })
       
        
    } catch (err) {
        res.status(400).json({
            Ok:false,
            err
        });
    }
}

module.exports = _file;
