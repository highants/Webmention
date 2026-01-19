# Webmention Test Page

GitHub PagesでWebmentionコメント機能をテストするためのプロジェクトです。

## 特徴
- **Premium Design**: ガラスモーフィズム（Glassmorphism）と動的な背景アニメーションを採用したモダンなデザイン。
- **Webmention Integration**: `webmention.io` APIを使用してコメントを動的に取得・表示します。
- **Mock Mode**: Webmentionがまだ設定されていない場合でも、デモデータを使用してUIを確認できます。

## 使い方

### 1. ローカルでのプレビュー
このフォルダで以下のコマンドを実行して、簡易サーバーを立ち上げてください。

```bash
# Pythonがインストールされている場合
python -m http.server
# または npx serve .
```
ブラウザで `http://localhost:8000` を開くと確認できます。

### 2. GitHub Pagesへのデプロイ
1. このフォルダの内容をGitHubリポジトリにプッシュします。
2. GitHubのリポジトリ設定 (Settings > Pages) で、Sourceを `main` ブランチに設定します。
3. 公開されたURLにアクセスします。

### 3. Webmentionの本格利用
実際に他のサイトからの言及を受け取るには、以下の手順が必要です：

1. **Webmention.ioへの登録**:
   - [Webmention.io](https://webmention.io/) にアクセスし、自分のドメイン（GitHub PagesのURLなど）でログインします。
   
2. **`index.html`の編集**:
   - `<head>`内の以下のタグの `username` を、あなたのWebmention.ioのユーザー名（通常はドメイン名）に変更してください。
     ```html
     <link rel="webmention" href="https://webmention.io/YOUR_USERNAME/webmention" />
     <link rel="pingback" href="https://webmention.io/YOUR_USERNAME/xmlrpc" />
     ```

3. **`app.js`の編集**:
   - `TARGET_URL` 変数を、あなたのGitHub Pagesの実際のURL（例: `https://username.github.io/Webmention/`）に変更してください。
     ```javascript
     const TARGET_URL = 'https://YOUR_USER.github.io/REPO_NAME/';
     ```

### 4. テスト送信
ページが公開されたら、[Webmention.ioのテストツール](https://webmention.io/tools)などを使って、手動でWebmentionを送信テストできます。
