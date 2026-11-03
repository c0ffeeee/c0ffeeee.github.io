// WORK IN PROGRESS!!!!!!!!!!!!!!!!

const gebi = document.getElementById;

gebi("run").addEventListener("click",()=>{
  let code = gebi("code").value.replace(/[^-+<>\[\].,]/g,"");
  let input = new TextEncoder().encode(gebi("input").value);
  gebi("output").value = "";
  gebi("stop-resume").disabled = false;
  gebi("stop-resume").textContent = "Stop";

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
})
