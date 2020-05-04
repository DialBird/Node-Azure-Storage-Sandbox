# Node x Azure Queue Storage

- [参考](https://docs.microsoft.com/ja-jp/azure/storage/queues/storage-nodejs-how-to-use-queues)

## 準備
- `.env`に以下の環境変数を設定
    - AZURE_STORAGE_ACCOUNT
    - AZURE_STORAGE_ACCESS_KEY
    - AZURE_STORAGE_CONNECTION_STRING

## できること
- `npm start`で起動し、別でcreateMessge.jsを引数（数字）と一緒に実行する
- 指定したストレージアカウントにメッセージが作られると同時に、それを自動で32件ずつデキューする
