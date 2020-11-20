let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let msg = document.querySelector('#message')
let counter=0;
let cellSize=150;
let map=[0,0,0,
        0,0,0,
        0,0,0]
let gameOver=false;
let winMatrix=new Array(3);
createMatrix();
let blank=0,X=1,o=-1;
canvas.width = 3*cellSize; 
canvas.height = 3*cellSize;

let currentPlayer=X;

canvas.addEventListener('click',(e)=>{
    let x=e.pageX-canvas.offsetLeft;
    let y=e.pageY-canvas.offsetTop;
    let cell=getCellByCords(x,y);
    play(cell);
})

function play(cell){
    counter++;
    console.log(counter)
    if(gameOver){
        msg.textContent='game Over';
    return;
    }
    if(map[cell]!=blank){
        msg.textContent="position taken";
        return;
    }
    map[cell]=currentPlayer;
    createMatrix();
    if(checkWin()==true){
        gameOver=true;
        currentPlayer==1?msg.textContent='Player1-X is winner'
            :msg.textContent='Player2-O is Winner'   
    }
    else if(counter==9&&checkWin()==false){
        draw();
        msg.textContent='tie'
        return;
    }
    currentPlayer*=-1;
    draw();
    
}

function checkWin(){
   //check row
   for(let row=0;row<3;row++){
       if((winMatrix[row][0]==winMatrix[row][1])&&  (winMatrix[row][1]==winMatrix[row][2]) &&(winMatrix[row][0]!=0)){
        console.log('row');
       return true;
       }
            
    }
    //check coloumn
    for(let col=0;col<3;col++){
        if((winMatrix[0][col]==winMatrix[1][col])&&  (winMatrix[1][col]==winMatrix[2][col]) &&(winMatrix[0][col]!=0)){
            console.log('coloumn')
            return true
        }
    }
    //check left diagonal
    if((winMatrix[0][0]==winMatrix[1][1])&&(winMatrix[1][1]==winMatrix[2][2])&&(winMatrix[0][0]!=0)){
       console.log('left diagonal')
        return true;
    }
    //chek right diagonal
    if((winMatrix[2][0]==winMatrix[1][1])&&(winMatrix[1][1]==winMatrix[0][2])&&(winMatrix[2][0]!=0)){
       console.log('right diagonal')
        return true;
    }
    return false;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBoard();
    fillBoard();
    function drawBoard(){
        ctx.strokeStyle='Black'
        ctx.lineWidth=10;
        //draw vertical
        ctx.beginPath();
        ctx.moveTo(cellSize,0);
        ctx.lineTo(cellSize,canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellSize*2,0);
        ctx.lineTo(cellSize*2,canvas.height);
        ctx.stroke();
        
        //draw horizontal
        ctx.beginPath();
        ctx.moveTo(0,cellSize);
        ctx.lineTo(canvas.width,cellSize);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0,cellSize*2);
        ctx.lineTo(canvas.width,cellSize*2);
        ctx.stroke();
    }
    function fillBoard(){
        for(let i=0;i<map.length;i++){

            let coords=getCellCords(i);
            ctx.save();
            ctx.translate(coords.x+cellSize/2,coords.y+cellSize/2)
            if(map[i]==X){
                drawX();
            }else if(map[i]==o){
                drawO();
            }
            ctx.restore();
        }
        
    }
    function drawX(){
        ctx.beginPath();
        ctx.moveTo(-cellSize/3,-cellSize/3);
        ctx.lineTo(cellSize/3,cellSize/3);
        ctx.moveTo(cellSize/3,-cellSize/3);
        ctx.lineTo(-cellSize/3,cellSize/3);
        ctx.stroke();
    }
    function drawO(){
        ctx.beginPath();
        ctx.arc(0,0,cellSize/3,0,Math.PI*2);
        ctx.stroke();
    }
}

function getCellCords(cell){
    let x= (cell%3)*cellSize;
    let y=Math.floor(cell/3)*cellSize;
    let obj ={
        'x':x,
        'y':y,
    }
    return obj
}
function getCellByCords(x,y){
    return (Math.floor(x/cellSize)%3)+(Math.floor(y/cellSize)*3)
}
draw()

function createMatrix(){
    for(let i=0;i<3;i++){
        winMatrix[i]=new Array(3);
    }
    let index=0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            winMatrix[i][j]=map[index];
        index++;
        }
    }
    //  console.log(winMatrix)
}