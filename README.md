# Laravel development my template

- [Setup](#setup)

## Setup

1. appコンテナに入る。
```
cd src

./vendor/bin/sail root-shell
```

2. envをコピー
```
cp .env.example .env
```

3. composer install
```
composer install
```

4. migration再実行 && Seeder実行
```
php artisan migrate:refresh --seed
```

5. storageの権限を777に変更する。
```
chmod -R 777 ./storage/
```