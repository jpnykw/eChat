# eChat スタートガイド

eChatの使い方ガイドです。  
不具合等ありましたらご連絡ください。  
まずは手順に沿って部屋を作成してみましょう。

#### 1. [トップページ](https://e-chat-jpnykw.herokuapp.com)に接続し `start now` をクリック  
![top page](https://github.com/JPNYKW/eChat/blob/master/steps/step1.PNG)

#### 2. - 1 部屋の情報を入力。何も入力しないとランダムで生成されます。  
#### 2. - 1 既存の部屋に入る場合はルーム名と鍵を入力してdecisionを押します。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step2.PNG)

#### 2. - 2 パスワードが一致しない場合、枠が赤くなります。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step2-2.PNG)

#### 3. - 1 認証中です。少しお待ち下さい。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3.PNG)

#### 3. - 2 認証されるとAcceptと表示されます。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3-2.PNG)

#### 3. - 3 パスワード違い、不正なアクセス等を行うとFailedと表示されます。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3-3.PNG)

#### 4. 接続が完了すると、入室ログが表示されます。これでチャットが使えます。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step4.PNG)

#### 5. messageに入力しsendまたはctrl + enterで発言します。アイコン色はランダムです。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step5.PNG)

#### 6. 特定のキーワードを含んで発言すると、アクションが発生します。同部屋の全ユーザーに見えます。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step6.PNG)

#### 7. 画面右のTwitterアイコンを押すと共有ツイートが行なえます。
![share page](https://github.com/JPNYKW/eChat/blob/master/steps/step7.PNG)

# チャットの使い方
・チャットは上が最新です。  

・自動スクロールはありません。  

・（ゲームコマンド）binaristと発言  
　→10秒後にシステムメッセージで問題が出現されます。  
　　答えを10進数で回答し送信し、正解なら次に進みます。  
　　他の人より早く回答できるようにがんばりましょう。  

・（エモートコマンド）「ねこ」または「にゃーん」と発言  
　→画面上に大量の猫が出現します  

・（エモートコマンド）「おはよう」と発言  
　→画面上に日の出の絵文字が出現します  

エモートコマンドには引数として実行秒数を指定可能です。  
例えば「にゃーん3秒」など文章中にn秒が含まれていれば自動で判定します。  
