@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
    <h1>ダッシュボード</h1>
@stop

@section('content')
    <div id="app">
      <p>@{{ msg }}</p>
    </div>
@stop

@section('css')
    {{-- ページごとCSSの指定
    <link rel="stylesheet" href="/css/xxx.css">
    --}}
@stop

@section('js')
    <script src="/js/app.js"></script>
    <script> console.log('ページごとJSの記述'); </script>
@stop