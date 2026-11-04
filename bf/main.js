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
        t.push( c==">"?1:-1 );
        a.push( ">" );
      }
    }else{
      t.push( 1 );
      a.push( c );
    }
  }
  let ec = "o=document.getElementById(\"output\");o.value=\"\";input=new TextEncoder().encode(document.getElementById(\"input\").value);inpp=0;mem=new Uint" + bits + "Array(30000);ptr=0;";
  let ti = [];
  let j = 0;
  let tj = [];
  let p = 0;
  let b = [];
  for( i = 0 ; ti = t[i] ; i++ ){
    if( ti == "[" ){
      if( t[i+2] == "]" ){
        if( t[i+1] == "+" && Math.abs(a[i+1]) == 1 ){
          ec += "mem[ptr]=0;";
          i += 2;
        }
      }else{
        b = [];
        p = 0;
        j = i;
        for( ; ( tj = t[++j] ) == "+" || tj == ">" ; ){
          if( tj == ">" ){
            p += a[j];
          }else{
            b[p] = ( b[p] || 0 ) + a[j];
          }
        }
        if( tj == "]" && b[0] == -1 ){
          for( let e of Object.entries(b) ){
            if( e[0] != "0" && e[1] != 0 ){
              ec += "mem[ptr+" + ec[0] + "]+=mem[ptr]" + ( e[1] == 1 ? ";" : "*" + e[1] + ";" );
            } 
          }
          ec += "mem[ptr]=0;";
          i = j;
        }else{
          ec += "{";
        }
      }
    }else if( ti == ">" ){
      ec += "ptr=(ptr+" + a[i] + ")%30000;";
    }else if( ti == "+" ){
      ec += "mem[ptr]+=" + a[i] + ";";
    }else if( ti == "," ){
      ec += "mem[ptr]=input[inpp++];";
    }else if( ti == "." ){
      ec += "o.value+=String.fromCharCode(mem[ptr]);"
    }else if( ti == "]" ){
      ec += "};";
    }
  }
  console.log(ec); // debug
})
