
module.exports = function() { 

    this.validacionLogin= function (body){
    
        var expreg = /^[0-9]{10}$/;

        if(!(expreg.test(body.Username)) || body.Username===''){
            console.log('Ingrese un numero de celular valido ([0-9]) de tamano 10 \n')
            return false;
        }
        return true
    }

    this.validacionActualizar= function (body){
        

        var expreg = /^[0-9]{10}$/;

        if(!(expreg.test(body.cellphone)) || body.cellphone===''){
        console.log('Ingrese un numero de celular valido ([0-9]) de tamano 10 \n')
        return false;
        }
        
        expreg = /^[A-Za-z ]{3,20}$/;

        if(!(expreg.test(body.nombre))|| body.nombre===''){
        console.log('Ingrese un nombre valido ([A-Z o a-z]) de tamano 3-20 \n')
        return false;
        }

        if(!(expreg.test(body.apellido)) || body.apellido===''){
            console.log('Ingrese un apellido valido ([A-Z o a-z]) de tamano 3-20 \n')
            return  false;
        }

        if(body.genero==="Select"){
            console.log('Seleccione un genero\n')
            return false;
        }   

        if(body.user==="Usuario"){
                expreg = /^[A-Za-z0-9 -#/]{5,25}$/;

            if(!(expreg.test(body.direccion))|| body.direccion===''){
                toaster.notify('Ingrese una direcion valida ([A-Za-z0-9 -#/]) de tamano 5-25 \n')
                return false;
            }

            expreg = /^[0-9]{10}$/;

            if(!(expreg.test(body.tarjeta)) || body.tarjeta===''){
                toaster.notify('Ingrese un numero de tarjeta valido ([0-9]) de tamano 10 \n')
                return false;
            }
        }

        if(body.user==="Conductor"){

            expreg = /^[A-Z]{3}[0-9]{3}$/;

            if(!(expreg.test(body.placa))|| body.placa===''){
                toaster.notify('Ingrese una placa valida con tres letras mayusculas y tres numeros \n')
                return false;
            }

            expreg = /^[A-Za-z ]{3,10}$/;

            if(!(expreg.test(body.modelo))|| body.modelo===''){
                toaster.notify('Ingrese un modelo valido ([A-Z o a-z]) de tamano 3-10\n')
                return false;
            }

            expreg = /^[A-Za-z ]{3,10}$/;

            if(!(expreg.test(body.modelo))|| body.modelo===''){
                toaster.notify('Ingrese un modelo valido ([A-Z o a-z]) de tamano 3-10\n')
                return false;
            }

            if(body.baul==="Select2"){
                toaster.notify('Seleccione un tipo de baul\n')
                return false;
            } 

            if(body.fecha==="Select1"){
                toaster.notify('Seleccione una fecha de fabricacion\n')
                return false;
            }        

            expreg = /^[0-9]{8}$/;

            if(!(expreg.test(body.soat)) || body.soat===''){
                toaster.notify('Ingrese un numero de soat valido ([0-9]) de tamano 8 \n')
                return false;
            }
        
        }

        return true;

    }
}