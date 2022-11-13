//Selectors
const tempInput = document.querySelector('.main_input');
const tempButton = document.getElementById('main_button');
const tempList = document.querySelector('.viewer_ul');
const ViewButton = document.getElementById('view-button');
const viewerList = document.querySelector('.message-ul');
const ViewAsButton = document.getElementById('view-message-as');


const NewUserid = document.getElementById('new-user-id');
const NewUserp = document.getElementById('new-user-p');
const NewUserq = document.getElementById('new-user-q');
const NewUsere = document.getElementById('new-user-e');
const NewUserd = document.getElementById('new-user-d');

const NewUserButton = document.getElementById('new-user-button');

const select = document.querySelector('.filter-user');
const select2 = document.querySelector('.filter-user2');
const select3 = document.querySelector('.filter-user-from');
const select4 = document.querySelector('.filter-user-to');
const select5 = document.querySelector('.filter-user-view');

const SendMessageButton = document.getElementById('send-message-button');
const TextMessage = document.getElementById('message-to-send');

//Event Listners
tempButton.addEventListener('click', addtolist);
ViewButton.addEventListener('click', Checking);
NewUserButton.addEventListener('click', MakeNewUser);
SendMessageButton.addEventListener('click', MessageSend);
ViewAsButton.addEventListener('click', MessageView);
//Functions
All_Messages = [];

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
    // console.log(transformed)
    
    stringing = ""
    for(i=0;i<nat_str.length;i++)
    {
        cur = String.fromCharCode(transformed[i])
        stringing = stringing+cur;
    }
    // console.log(stringing)
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

var AllUsers = []

var One = new User(0, 191, 827, 37, 33933);
var Two = new User(1, 281, 167, 39423, 26767);
var Three = new User(2, 181, 431, 97, 64633);
AllUsers.push(One);
AllUsers.push(Two);
AllUsers.push(Three);


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
    // console.log("MEssage = ",m, " and Decrypted = ", decrypted);

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
    // console.log(m, d, n);
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
function Checking(event)
{
    event.preventDefault();
    const listItems = document.querySelectorAll('.viewer_ul li');
    for (let i = 0; i <= listItems.length - 1; i++) {
        console.log(listItems[i].innerText);
        k = listItems[i].innerHTML;
        strn = decrypt(One, Two, k);
        listItems[i].innerHTML = strn;
    }
}

function MakeNewUser() {
    if (NewUserid.value==="" || NewUserp.value==="" ||NewUserq.value==="" || NewUsere.value==="" || NewUserd.value==="")
    {
        console.log("Add all correct values ");
    }
    else
    {
        console.log("New User = " , NewUserid.value, " created");
    var newUser = new User(NewUserid.value, NewUserp.value, NewUserq.value, NewUsere.value, NewUserd.value);
    AllUsers.push(newUser);
    // let tempOption = document.createElement("OPTION");
    let tempOption2 = document.createElement("OPTION");
    let tempOption3 = document.createElement("OPTION");
    let tempOption4 = document.createElement("OPTION");
    let tempOption5 = document.createElement("OPTION");

    // let tempOptionVal = document.createTextNode(NewUserid.value.toString());
    let tempOptionVal2 = document.createTextNode(NewUserid.value.toString());
    let tempOptionVal3 = document.createTextNode(NewUserid.value.toString());
    let tempOptionVal4 = document.createTextNode(NewUserid.value.toString());
    let tempOptionVal5 = document.createTextNode(NewUserid.value.toString());

    // tempOption.appendChild(tempOptionVal);
    tempOption2.appendChild(tempOptionVal2);
    tempOption3.appendChild(tempOptionVal3);
    tempOption4.appendChild(tempOptionVal4);
    tempOption5.appendChild(tempOptionVal5);


    // select.insertBefore(tempOption, select.lastChild);
    select2.insertBefore(tempOption2, select2.lastChild);
    select3.insertBefore(tempOption3, select3.lastElementChild);
    select4.insertBefore(tempOption4, select4.lastChild);
    select5.insertBefore(tempOption5, select5.lastChild);
    }
}



function MessageSend(event)
{
    event.preventDefault();

    let Ufrom = parseInt(select3.value);
    let Uto = parseInt(select4.value);
    if (isNaN(Uto) || isNaN(Ufrom) || Uto===Ufrom){
        console.log("Not Possible");
    }
    else
    
    {let complete_message = TextMessage.value;

    encrypted_message = RSA_ecnrypt(AllUsers[Ufrom], AllUsers[Uto], complete_message);

    // console.log(encrypted_message);

    All_Messages.push([encrypted_message, Ufrom, Uto]);

    const mess = document.createElement("div");
    mess.classList.add("mess");

    const newEle = document.createElement("li");
    newEle.innerText = String(encrypted_message);
    newEle.classList.add('mess-item');
    mess.appendChild(newEle);

    viewerList.append(mess);

    TextMessage.value = "";
}
}

function MessageView(event){
    event.preventDefault();
    const listItems = document.querySelectorAll('.message-ul li');
    var usecase = parseInt(select5.value);
    if (isNaN(usecase))
    {
        console.log("Enter Which Viewver as");
    }
    else
    {
    for (let i = 0; i <= listItems.length - 1; i++) {
        // console.log(listItems[i].innerText);
        k = listItems[i].innerHTML;
        
        strn = decrypt(One, AllUsers[usecase], k);
        [m, fro, to] = All_Messages[i];
        d = AllUsers[fro].get_private_key();
        n = AllUsers[fro].get_n();
        m = parseInt(k.split(",")[0]);
        currdigital_footprint = [m, powerMod(m,d,n)];

        var ver = verify_digital_signature(currdigital_footprint, Two, One);
        var specify = " Digital Signature Verified:From 1";
        if (ver===false)
        {
            specify = " Digital Signature not Verified: not From 1";
        }
        if (strn==="")
        {}
        else{
        listItems[i].innerHTML = strn+ specify;}
    }
}
}

function verify_digital_signature(digital_footprint, fromperson, twoperson)
{
    [term_one, term_two] = digital_footprint;
    n = fromperson.get_n();
    e = fromperson.get_public_key();
    if (powerMod(term_two,e,n)===(term_one%n))
    {
        console.log("Digital SIgnature Verified");
        return true;
    }
    return false;
}











b = AllUsers[0].n;
Initial_users = ['0','1'];

for(let i=0;i<AllUsers.length;i++)
{

// tempOption = document.createElement("OPTION");
tempOption2 = document.createElement("OPTION");
tempOption3 = document.createElement("OPTION");
tempOption4 = document.createElement("OPTION");
tempOption5 = document.createElement("OPTION");


// tempOptionVal = document.createTextNode(AllUsers[i].id);
tempOptionVal2 = document.createTextNode(AllUsers[i].id);
tempOptionVal3 = document.createTextNode(AllUsers[i].id);
tempOptionVal4 = document.createTextNode(AllUsers[i].id);
tempOptionVal5 = document.createTextNode(AllUsers[i].id);


// tempOption.appendChild(tempOptionVal);
tempOption2.appendChild(tempOptionVal2);
tempOption3.appendChild(tempOptionVal3);
tempOption4.appendChild(tempOptionVal4);
tempOption5.appendChild(tempOptionVal5);


// select.insertBefore(tempOption, select.lastChild);
select2.insertBefore(tempOption2, select2.lastChild);
select3.insertBefore(tempOption3, select3.lastChild);
select4.insertBefore(tempOption4, select4.lastChild);
select5.insertBefore(tempOption5, select5.lastChild);
}




