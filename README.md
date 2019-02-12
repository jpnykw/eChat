eChatスタートガイド（使い方）は[こちらへ](https://github.com/JPNYKW/eChat#echat-スタートガイド)  

# お知らせ（随時更新）
2019/02/12 16:11現在、cssミスにより、  
一部の色が意図したものと異なる箇所が存在しています。  
私事ですが現在家におらずリモート作業が出来ないので19:00頃まで修正出来ません。  
帰宅次第、速やかにheroku上に修正したものをデプロイいたします。  
よろしくお願いします。

# 初めに
これは絶賛作りかけです。  
基本的な機能は搭載して使えますが、  
改善点が多いです。  

あらかじめご了承ください><  
（言い訳すると、今回のコンテストも  
締め切り数日前から開発始めました）  

今後もちまちまアップデートしてくつもりです。  
よろしくお願いします。  

`node.js`と`socket.io`以外にある、  
html, css, js, 画像などは全て自作です。

# 起動方法
レポジトリをクローン/ダウンロードしてローカルで動かす方法です。  

1. socket.ioをインストールします。  
`npm install socket.io`  

2. eChatを起動します。  
`node index`  

3. 最後にURLにアクセスします。  
`https://localhost:8000`

4. 注意書き  
ディレクトリ内に`json`フォルダがあります。  
この中にある`user.json`と`room.json`は、  
ユーザーデータとルームデータを格納します。  
接続/切断時に自動でデータ更新を行いますが、  
万が一エラーの発生などで起動できない場合は、    
各ファイルの中身を`{}`に書き換えていただくようお願いします。  

# eChat スタートガイド

eChatの使い方ガイドです。  
不具合等ありましたらご連絡ください。  

eChatはherokuで運用しているので、  
30分間アクセスが無いとスリープ状態になります。  
その際は起動に多少の時間がかかります。  

まずは手順に沿って部屋を作成してみましょう。

#### 1. [トップページ](https://e-chat-jpnykw.herokuapp.com)に接続し `start now` をクリック  
![top page](https://github.com/JPNYKW/eChat/blob/master/steps/step1.PNG)

#### 2. - 1 部屋の情報を入力。何も入力しないとランダムで生成されます。  
#### 2. - 1 既存の部屋に入る場合はルーム名と鍵を入力して`decision`を押します。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step2.PNG)

#### 2. - 2 パスワードが一致しない場合、枠が赤くなります。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step2-2.PNG)

#### 3. - 1 認証中です。少しお待ち下さい。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3.PNG)

#### 3. - 2 認証されると`Accept`と表示されます。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3-2.PNG)

#### 3. - 3 パスワードの不一致か、不正なアクセス等を行うと`Failed`と表示されます。
![setup page](https://github.com/JPNYKW/eChat/blob/master/steps/step3-3.PNG)

#### 4. 接続が完了すると、入室ログが表示されます。これでチャットが使えます。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step4.PNG)

#### 5. `message`に入力し`send`クリックまたは`ctrl + enter`で発言します。アイコン色はランダムです。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step5.PNG)

#### 6. 特定のキーワードを含んで発言すると、アクションが発生します。同部屋の全ユーザーに見えます。
![chat page](https://github.com/JPNYKW/eChat/blob/master/steps/step6.PNG)

#### 7. 画面右のTwitterアイコンを押すと共有ツイートが行なえます。
![share page](https://github.com/JPNYKW/eChat/blob/master/steps/step7.PNG)

# チャットの使い方
・チャットは上が最新です。  

・自動スクロールはありません。  

・（**ゲームコマンド**）binaristと発言  
　→10秒後にシステムメッセージで問題が出現されます。  
　　答えを10進数で回答し送信し、正解なら次に進みます。  
　　他の人より早く回答できるようにがんばりましょう。  

・（**エモートコマンド**）「ねこ」または「にゃーん」と発言  
　→画面上に大量の猫が出現します  

・（**エモートコマンド**）「おはよう」と発言  
　→画面上に日の出の絵文字が出現します  

**エモートコマンド**には引数として実行秒数を指定可能です。  
例えば「にゃーん3秒」など文章中にn秒が含まれていれば自動で判定します。  

# バージョン管理
ブランチで管理しています。`vXX.YY`がバージョン数です。  
リリース直後は`v1.0`で常に`master`が最新バージョンです。  
