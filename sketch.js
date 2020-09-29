var player,computer,ball,gamestate,ps,cs;

var hitsound,wallhit,score,edges;

function preload()
{
  
  hitsound=loadSound("hit.mp3");
  score=loadSound("score.mp3");
  wallhit=loadSound("wall_hit.mp3"); 
  
}




function setup()
{
  createCanvas(400,400);
  player=createSprite(390,200,10,80);
  computer=createSprite(10,200,10,80);
  ball=createSprite(200,200,10,10);
  ps=0;
  cs=0;
  gamestate='serve';
  edges=createEdgeSprites();
  
}
function draw()
{
  background("white");
  
  
  player.y=mouseY;
  computer.y=ball.y;
  
  
  for(var i=0;i<400;i=i+20)
  {
   line(200,i,200,i+10); 
  }
  textSize(20);
  text(ps,280,60);
  text(cs,80,60);
  
  if(gamestate==='serve')
  {
    text("press space to serve",140,180);
       
  }
  if(gamestate==='over')
  {
    
   text("GAME OVER",150,50);
    text("press 'r' to restart the game",80,160);
    
    
  }
  if(keyDown("r") && gamestate==='over')
  {
    gamestate='serve';
    ps=0;
    cs=0;
  }
    
  if(keyDown("space")&& gamestate==='serve')
  {
    ball.velocityX=6;
    ball.velocityY=7;
    gamestate='play';
  }
    
    if(ball.x<0 || ball.x>400)
    {
      
      if(ball.x<0)
      {
       ps=ps+1; 
        
      }
      if(ball.x>400)
      {
        cs=cs+1;
      }    
      
     score.play(); 
     ball.x=200;
      ball.y=200;
      ball.velocityX=0;
      ball.velocityY=0;
      gamestate='serve';
        
      
    }
    if(ps==5 || cs===5)
    {
     gamestate='over';
          
    }
  if(ball.isTouching(player))
  {
   ball.x=ball.x-6;
    ball.velocityX=-ball.velocityX;
    hitsound.play();
    
  }
  
  if(ball.isTouching(computer))
  {
   ball.x=ball.x+6;
    ball.velocityX=-ball.velocityX;
   
    hitsound.play();
  }
  if(ball.isTouching(edges[2]) || ball.isTouching(edges[3]))
  {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
  wallhit.play();
  
  }
  
  
  
  
  
  
  
  
  
  
  
 drawSprites(); 
}