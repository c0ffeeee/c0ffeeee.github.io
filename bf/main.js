// WORK IN PROGRESS!!!!!!!!!!!!!!!!

document.getElementById("run").addEventListener("click",()=>{
  let code = document.getElementById("code").value.replace(/[^-+<>\[\].,]/g,"").replace(/[]/g,);
  let input = new TextEncoder().encode(document.getElementById("input").value);
  document.getElementById("output").value = "";
  document.getElementById("stop-resume").disabled = false;
  document.getElementById("stop-resume").textContent = "Stop";

  let t = [];
  let c = "";
  let type = "";
  for( let i = 0 ; c = code[i] ; i++ ){
    if( c == "+" || c == "-" ){
      if( type == "+" ){
        t[t.length-1][0] = t[t.length-1][0] + + ( c + 1 );
      }else{
        t.push([ +(c+1), "+" ]);
        type = "+";
      }
    }else if( c == ">" || c == "<" ){
      if( type == ">" ){
        t[t.length-1][0] = t[t.length-1][0] + ( c == ">" ? 1 : -1 );
      }else{
        t.push([ (c==">"?1:-1), ">" ]);
        type = ">";
      }
    }else{
      t.push([ 1, c ]);
      type = c;
    }
  }
  let ec = "";
  let ti = [];
  for( i = 0 ; ti = t[i] ; i++ ){
    if( ti == [1, "["] ){
      if( t[i+2] == [1, "]"] ){
        if( t[i+1][1] == ">" ){
          ec += 
        }
      }
    }else{
      
    }
  }
})
