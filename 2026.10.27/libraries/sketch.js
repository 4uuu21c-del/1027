
let drinkSprite; // 宣告飲料角色的圖片精靈變數
let frameIndex = 0; // 記錄目前播放的動畫影格編號
let totalFrames = 15; // 設定圖片精靈總共有15張圖片
let spriteWidth = 835 / 15; // 計算每張圖片的原始寬度
let spriteHeight = 85; // 設定每張圖片的原始高度
let characterX; // 儲存角色目前的水平位置
let characterY; // 儲存角色目前的垂直位置
let moveSpeed = 3; // 設定角色每一影格移動的速度
let direction = 1; // 設定角色方向，1代表右邊，-1代表左邊
let animationSpeed = 6; // 設定動畫播放速度，數字越小播放越快

function preload() { // 在程式開始前預先載入圖片資源
  drinkSprite = loadImage("1/drink/drink.png"); // 載入飲料角色的圖片精靈圖檔
} // 結束圖片載入函式

function setup() { // 設定畫布與角色初始狀態
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布
  imageMode(CENTER); // 將圖片的繪製基準點設定為圖片中心
  frameRate(60); // 設定每秒更新60個畫面
  characterX = width / 2; // 將角色的初始水平位置設定在畫面中央
  characterY = height / 2; // 將角色的初始垂直位置設定在畫面中央
} // 結束初始化函式

function draw() { // 每一影格都會執行的繪圖與動畫函式
  background("#d8e2dc"); // 使用指定的淺灰綠色作為畫布背景

  if (keyIsDown(RIGHT_ARROW)) { // 判斷使用者是否持續按住鍵盤右方向鍵
    characterX += moveSpeed; // 讓角色向右移動指定的速度
    direction = 1; // 設定角色面向右方
  } // 結束右方向鍵判斷

  if (keyIsDown(LEFT_ARROW)) { // 判斷使用者是否持續按住鍵盤左方向鍵
    characterX -= moveSpeed; // 讓角色向左移動指定的速度
    direction = -1; // 設定角色面向左方
  } // 結束左方向鍵判斷

  let displayWidth = 150; // 設定角色顯示在畫面上的寬度
  let displayHeight = displayWidth * spriteHeight / spriteWidth; // 依照原始比例計算角色顯示高度

  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色不會移出畫布左右邊界
  characterY = constrain(characterY, displayHeight / 2, height - displayHeight / 2); // 限制角色不會移出畫布上下邊界

  if (frameCount % animationSpeed === 0) { // 每隔指定影格數才更新一次動畫
    frameIndex = (frameIndex + 1) % totalFrames; // 依序切換影格並在最後一張後回到第一張
  } // 結束動畫影格更新判斷

  push(); // 儲存目前的繪圖設定，避免影響其他畫面元素
  translate(characterX, characterY); // 將繪圖原點移動到角色目前的位置

  if (direction === -1) { // 判斷角色是否需要面向左方
    scale(-1, 1); // 水平翻轉圖片，讓角色面向左方
  } // 結束角色轉向判斷

  image( // 開始繪製目前的角色動畫影格
    drinkSprite, // 指定已載入的圖片精靈
    0, // 設定圖片中心的水平繪製座標
    0, // 設定圖片中心的垂直繪製座標
    displayWidth, // 設定圖片顯示寬度
    displayHeight, // 設定圖片顯示高度
    frameIndex * spriteWidth, // 設定來源影格在原始圖片中的水平起點
    0, // 設定來源影格在原始圖片中的垂直起點
    spriteWidth, // 設定來源影格的寬度
    spriteHeight // 設定來源影格的高度
  ); // 結束角色圖片繪製

  pop(); // 還原先前的繪圖設定
} // 結束每一影格的繪圖函式

function windowResized() { // 當瀏覽器視窗尺寸改變時執行
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整成新的視窗大小
  characterX = constrain(characterX, 75, width - 75); // 確保角色在調整後仍位於畫布水平範圍內
  characterY = constrain(characterY, 10, height - 10); // 確保角色在調整後仍位於畫布垂直範圍內
} // 結束視窗尺寸調整函式

