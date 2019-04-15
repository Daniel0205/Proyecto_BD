
module.exports = function() { 

    this.validacionLogin= function (body){
    
        var expreg = /^[0-9]{10}$/;

        if(!(expreg.test(body.Username)) || body.Username===''){
            return false;
        }
        return true
    }

    this.validacionActualizar= function (body){
        

        var expreg = /^[0-9]{10}$/;

        if(!(expreg.test(body.cellphone)) || body.cellphone===''){
        return false;
        }
        
        expreg = /^[A-Za-z ]{3,20}$/;

        if(!(expreg.test(body.nombre))|| body.nombre===''){
        return false;
        }

        if(!(expreg.test(body.apellido)) || body.apellido===''){
            return  false;
        }

        if(body.genero==="Select"){
            return false;
        }   

        if(body.user==="Usuario"){
                expreg = /^[A-Za-z0-9 -#/]{5,25}$/;

            if(!(expreg.test(body.direccion))|| body.direccion===''){
                return false;
            }

            expreg = /^[0-9]{10}$/;

            if(!(expreg.test(body.tarjeta)) || body.tarjeta===''){
                return false;
            }
        }

        if(body.user==="Conductor"){

            expreg = /^[A-Z]{3}[0-9]{3}$/;

            if(!(expreg.test(body.placa))|| body.placa===''){
                return false;
            }

            expreg = /^[A-Za-z ]{3,10}$/;

            if(!(expreg.test(body.modelo))|| body.modelo===''){
                return false;
            }

            expreg = /^[A-Za-z ]{3,10}$/;

            if(!(expreg.test(body.modelo))|| body.modelo===''){
                return false;
            }

            if(body.baul==="Select2"){
                return false;
            } 

            if(body.fecha==="Select1"){
                return false;
            }        

            expreg = /^[0-9]{8}$/;

            if(!(expreg.test(body.soat)) || body.soat===''){
                return false;
            }
        
        }

        return true;

    }
}