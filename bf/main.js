// WORK IN PROGRESS!!!!!!!!!!!!!!!!

document.getElementById("run").addEventListener("click",()=>{
  let code = document.getElementById("code").value.replace(/[^-+<>\[\].,]/g,"").replace(/[]/g,);
  document.getElementById("stop-resume").disabled = false;
  document.getElementById("stop-resume").textContent = "Stop";

  let bits = 8;
  
  let t = [];
  let a = [];
  let c = "";
  for( let i = 0 ; c = code[i] ; i++ ){
    if( c == "+" || c == "-" ){
      if( a[a.length-1] == "+" ){
        t[t.length-1] += + ( c + 1 );
      }else{
        t.push( +(c+1) );
        a.push( "+" );
      }
    }else if( c == ">" || c == "<" ){
      if( a[a.length-1] == ">" ){
        t[t.length-1] += ( c == ">" ? 1 : -1 );
      }else{
        t.push( c == ">" ? 1 : -1 );
        a.push( ">" );
      }
    }else{
      t.push( 1 );
      a.push( c );
    }
  }
  let ec = "o=document.getElementById(\"output\");o.value=\"\";input=new TextEncoder().encode(document.getElementById(\"input\").value);inpp=0;mem=new Uint" + bits + "Array(30000);ptr=0;";
  let ai = "";
  let j = 0;
  let tj = [];
  let p = 0;
  let b = [];
  for( i = 0 ; ai = a[i] ; i++ ){
    if( ai == "[" ){
      if( a[i+2] == "]" && a[i+1] == "+" && Math.abs(t[i+1]) == 1 ){
        ec += "mem[ptr]=0;";
        i += 2;
      }else{
        b = [];
        p = 0;
        j = i;
        for( ; ( aj = a[++j] ) == "+" || aj == ">" ; ){
          if( aj == ">" ){
            p += t[j];
          }else{
            b[p] = ( b[p] || 0 ) + t[j];
          }
        }
        if( aj == "]" && b[0] == -1 ){
          for( let e of Object.entries(b) ){
            if( e[0] != "0" && e[1] != 0 ){
              ec += "mem[ptr+" + e[0] + "]+=mem[ptr]" + ( e[1] == 1 ? ";" : "*" + e[1] + ";" );
            } 
          }
          ec += "mem[ptr]=0;";
          i = j;
        }else{
          ec += "while(mem[ptr]){";
        }
      }
    }else if( ai == ">" ){
      ec += "ptr=(ptr+" + t[i] + ")%30000;";
    }else if( ai == "+" ){
      ec += "mem[ptr]+=" + t[i] + ";";
    }else if( ai == "," ){
      ec += "mem[ptr]=input[inpp++];";
    }else if( ai == "." ){
      ec += "o.value+=String.fromCharCode(mem[ptr]);"
    }else if( ai == "]" ){
      ec += "}\n";
    }
  }
  console.log(ec); // debug
})
