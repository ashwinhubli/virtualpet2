//Create variables here
var dog;
var milk;
var database;
var foodStock;
var foodS = 20;
var gameState;
var feed,addFood;
var fedTime;
var lastFed;
var foodObj = 0;
function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  milkimg = loadImage("images/Milk.png");
    }

function setup() {
	createCanvas(displayWidth,displayHeight);
  dog = createSprite(850,250,30,30);
  dog.addImage(dogImg2);
  dog.scale = 0.2;

foodObj= new Food(200,300,20,20);

  feed = createButton("Feed the dog");
  feed.position(700,95); 
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95); 
  addFood.mousePressed(addFoods);

  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

fedTime = database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

}


function draw() {  
  background(46,139,87);
    fill("blue");
    textSize(15);
    stroke('yellow');
    strokeWeight(1);

    if(lastFed>=12){
      text("Last fed :"+ lastFed%12 + " PM", 350,130);
     }else if(lastFed==0){
       text("Last fed : 12 AM",350,130);
     }else{
       text("Last fed : "+ lastFed + " AM",350,130);
     }
  text("YOUR DOG IS HUNGRY.FEED IT",100,20);
  text("Note:Press UP_ARROW key To Feed Drago Milk",50,40);
     
 

  drawSprites();
  //add styles here
  fill("yellow");
  textSize(15);
  text("food remaining : "+foodS,50,80);
    if(foodS<1){
    fill("blue");
    textSize(20);
   foodS = 0;
   dog.addImage(happyDog);

   
  }
  foodObj.display();
  }

function readStock(data)
{
   foodS-data.val();
}   
function WriteStock(x){

if(x<=0){
  x = 0;
}
else{
  x=x-1
}

database.ref('/').update({
  Food:x
})

}
function feedDog(){
dog.addImage(happyDog);
foodS--;
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime : hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}




