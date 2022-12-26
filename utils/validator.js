//rule = [required, email, phone]

const validator = (inputRef, messageErrorRef, rules) => {
    for(var rule of rules){
        if(rule === 'required'){
            if(inputRef.current?.value?.trim().length === 0) {
                messageErrorRef.current.innerHTML = 'Không được để trống trường này'
                messageErrorRef.current.style.opacity = 1;
                inputRef.current.classList.add('error')
                return false
            }
        } else if(rule === 'email'){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const isEmail = regex.test(inputRef.current?.value)
            if(!isEmail){
                messageErrorRef.current.innerHTML = 'Trường này phải là email'
                messageErrorRef.current.style.opacity = 1;
                inputRef.current.classList.add('error')
                return false
            }
        } else if(rule === 'phone') {
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if(vnf_regex.test(inputRef.current?.value) == false){
                messageErrorRef.current.innerHTML = 'Số điện thoại không hợp lệ'
                messageErrorRef.current.style.opacity = 1;
                inputRef.current.classList.add('error')
                return false
            }
        }
    }
    return true
}

export default validator