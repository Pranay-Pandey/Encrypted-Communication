//Selectors
const tempInput = document.querySelector('.main_input');
const tempButton = document.getElementById('main_button');
const tempList = document.querySelector('.viewer_ul');
const ViewButton = document.getElementById('view-button');


//Event Listners
tempButton.addEventListener('click', addtolist);
ViewButton.addEventListener('click', Checking);
//Functions

function addtolist(event){
    event.preventDefault();

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const newEle = document.createElement("li");
    newEle.innerText = String(tempora(tempInput.value));
    newEle.classList.add('todo-item');
    todo.appendChild(newEle);

    // const ViewButton = document.createElement('button');
    // ViewButton.innerHTML = '<i class="fas fas-check"></i>';
    // ViewButton.classList.add("view-button");
    // ViewButton.innerText = "View";
    // todo.appendChild(ViewButton);


    tempList.append(todo);
    ne_ele = String(adapter(tempInput.value));
    // tempList.append(ne_ele);

    tempInput.value = "";
}

function change(nat_str)
{
    transformed = []
    for(i=0;i<nat_str.length;i++)
    {
        cur = nat_str.charCodeAt(i);
        cur += 3
        transformed.push(cur)
    }
    console.log(transformed)
    
    stringing = ""
    for(i=0;i<nat_str.length;i++)
    {
        cur = String.fromCharCode(transformed[i])
        stringing = stringing+cur;
    }
    console.log(stringing)
    return [stringing,transformed];
}

class User
{
    constructor(id, p, q, e,d){
        this.id = id;
        this.p = p;
        this.q = q;
        this.n = p*q;
        this.publickey = e;
        this.privatekey = d;
    } 

    get_public_key()
    {
        return this.publickey;
    }

    get_private_key()
    {
        return this.privatekey;
    }

    get_n()
    {
        return this.n;
    }
}

var One = new User(1, 13, 7, 5, 29);
var Two = new User(0, 281, 167, 39423, 26767);
function RSA(message)
{
    //message going from A to B
    transformed = []
    original = []
    decrypted = []
    m=0;
    for(i=0;i<message.length;i++)
    {
        cur = message.charCodeAt(i)-97;
        m = (m + (cur*(26**i))%437)%437;
        original.push(cur);
        cur = (cur**Two.publicKey)%Two.n;
        transformed.push(cur);   
    }

    for(i=0;i<message.length;i++)
    {
        cur = transformed[i];
        cur = (cur**Two.privatekey)%Two.n;
        decrypted.push(cur);
    }

    return [transformed, original, decrypted,m];
}

function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

function finalRSA(message)
{
    //message going from A to B
    transformed = []
    original = []
    gettingbackoriginal = []
    m=0;
    
    for(i=0;i<message.length;i++)
    {
        cur = message.charCodeAt(i)-97;
        original.push(cur);
        m = (m + (cur*(26**(message.length-i-1)))%437)%437;
        // original.push(cur);   
    }

    //encryption
    encrpted = powerMod(m,25,437);
    // (m**25)%437; 

    decrypted = powerMod(encrpted, 301, 437);
    console.log("MEssage = ",m, " and Decrypted = ", decrypted);
    temp = decrypted;
    while(temp>=1)
    {
        rem= temp%26;
        gettingbackoriginal.push(rem);
        temp = Math.floor(temp/26)
    }
    
    // (encrpted**301)%437;
    return [m,encrpted, decrypted,original,gettingbackoriginal];

}



function finalRSA_experimanetal(message)
{


    //message going from A to B
    transformed = []
    original = []
    gettingbackoriginal = []
    m=0;
    return_str = "";
    offset = 0;
    COM_SET = 150;
    if (offset==0)
    {
        COM_SET = 150;
    }
    for(i=0;i<message.length;i++)
    {
        cur = message.charCodeAt(i)-offset;
        original.push(cur);
        m = (m + (cur*(COM_SET**(message.length-i-1)))%46927)%46927;
        // original.push(cur);   
    }
    

    //encryption
    encrpted = powerMod(m,39423,46927);
    
    decrypted = powerMod(encrpted, 26767, 46927);
    // console.log("MEssage = ",m, " and ecrption = ", encrpted,  " and Decrypted = ", decrypted);
    temp = decrypted;
    while(temp>=1)
    {
        rem= temp%COM_SET;
        gettingbackoriginal.push(rem);
        temp = Math.floor(temp/COM_SET);
    }

    for(b=0;b<gettingbackoriginal.length;b++)
    {
        return_str = return_str+String.fromCharCode(gettingbackoriginal[gettingbackoriginal.length-b-1]+offset);
    }

    // console.log("len encrypted = ", message.length, " len decrypted = ", gettingbackoriginal.length);
    
    // (encrpted**301)%437;
    return [m,encrpted, decrypted,original,gettingbackoriginal,return_str];




}

function adapter(mess)
{  
    strn = ""
    for(let i=0;i<mess.length;i=i+2)
    {
        [A,B,C,D,E,F] = RSA_Comm(One, Two, mess.slice(i,i+2));
        strn = strn+F;
        // console.log("DOne once = ", F, " for i = ", i);
    }
    // console.log(strn);
    return strn;
}

function RSA_Comm(person1, person2, str_to_transfer)
{
    //message going from person1 to person1
    transformed = []
    original = []
    gettingbackoriginal = []
    m=0;
    return_str = "";
    offset = 0;
    COM_SET = 150;
    // if (offset===97)
    // {
    //     COM_SET = 26;
    // }
    n = person2.get_n();
    e = person2.get_public_key();
    d = person2.get_private_key()
    for(i=0;i<str_to_transfer.length;i++)
    {
        cur = str_to_transfer.charCodeAt(i)-offset;
        original.push(cur);
        m = (m + (cur*(COM_SET**(str_to_transfer.length-i-1)))%n)%n;
        // original.push(cur);   
    }
    //encryption
    encrpted = powerMod(m, e, n);
    
    
    decrypted = powerMod(encrpted, d, n);
    console.log(m, d, n);
    temp = decrypted;
    while(temp>=1)
    {
        rem= temp%COM_SET;
        gettingbackoriginal.push(rem);
        temp = Math.floor(temp/COM_SET);
    }

    for(b=0;b<gettingbackoriginal.length;b++)
    {
        return_str = return_str+String.fromCharCode(gettingbackoriginal[gettingbackoriginal.length-b-1]+offset);
    }

    return [m,encrpted, decrypted,original,gettingbackoriginal,return_str];


}

function tempora(message)
{
    return RSA_ecnrypt(One, Two, message);
}

function RSA_ecnrypt(person1, person2, message)
{
    strn = ""
    list_of_encrypted = []
    for(let i=0;i<message.length;i=i+2)
    {
        [A,B,C,D,E,F] = RSA_Comm(person1, person2, message.slice(i,i+2));
        list_of_encrypted.push(B);
        // console.log("DOne once = ", F, " for i = ", i);
    }
    // console.log(strn);
    return list_of_encrypted;   
}

function decrypt(person1, person2, arr)
{   
    B = arr.split(",");
    // console.log(typeof(B[0]));
    for(let i=0;i<B.length;i=i+1)
    {
        B[i] = parseInt(B[i]);
    }
    // console.log(typeof(B[0]));

    str_to_retrun = "";
    var d = person2.get_private_key();
    var n = person2.get_n();

    var COM_SET = 150;
    var offset = 0;
    for(let i=0;i<B.length;i=i+1)
    {
        var gettingbackoriginal = [];
        encrpted = B[i];
        decrypted = powerMod(encrpted, d, n);
        // console.log(m, d, n);
        temp = decrypted;
        while(temp>=1)
        {
            rem= temp%COM_SET;
            gettingbackoriginal.push(rem);
            temp = Math.floor(temp/COM_SET);
        }
        return_str = "";
        for(b=0;b<gettingbackoriginal.length;b++)
        {
            return_str = return_str+String.fromCharCode(gettingbackoriginal[gettingbackoriginal.length-b-1]+offset);
        }
        str_to_retrun = str_to_retrun + return_str;

    }

    return str_to_retrun;
    

}
function Checking()
{
    // const item = e.target;

    // if (item.classList[0]==='view-button'){
    //     const te = document.getElementsByTagName('li');
    //     const toddsgo = item.parentElement;
    //     // console.log(te);
    event.preventDefault();
    const listItems = document.querySelectorAll('.viewer_ul li');
    for (let i = 0; i <= listItems.length - 1; i++) {
        console.log(listItems[i].innerText);
        k = listItems[i].innerHTML;
        
        strn = decrypt(One, Two, k);
        listItems[i].innerText = strn;
    }
}
