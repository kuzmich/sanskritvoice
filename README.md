# Код и тексты для сайта sanskritvoice.ru

Сайт генерируется с помощью Jekyll, и расположен на Github Pages.
Ниже инструкция, как генерировать сайт локально и добавлять баджаны.

## Установка Jekyll
Gihub Pages (GP) используют определенные версии Ruby и Jekyll. Чтобы избежать проблем, поставим локально
те же самые версии, что и у GP.

- Ставим менеджер версий Ruby [rbenv](https://github.com/rbenv/rbenv)
- Узнаем версию, [которую использует GP](https://pages.github.com/versions/)
- Ставим Ruby (впишите правильную версию)
        
        $ RV=2.7.1
        $ rbenv local $RV
        $ rbenv install $RV
        
- Ставим Jekyll

        $ gem install bundler
        $ bundler install
  
- Запускаем генератор

        $ bundle exec jekyll serve

## Добавляем новые баджаны

- Смотрим имя последнего файла в папке `_bhajans`
- Увеличиваем номер на 1 и создаем новый файл
- Используем шаблон из любого файла. Как минимум должно быть название, категория (используемые 
категории перечислены в файле `_data/categories.yml`), и текст. Аккорды вставляем в фигурные скобки.

        ---
        title: Джая Джая Шива Шамбо
        category: Шива
        ---
        {Dm}Джая Джая Шива Шам{F}бо  
        {C}Джая Джая Шива Шам{Dm}бо  

        Маха Дева Шам{F}бо  
        {C}Маха Дева Шам{Dm}бо
        
Можно задать видео на YouTube:
    
    video:
      - ytid: <youtube id>
        
## После того, как GP обновит Jekyll до версии 4,
Перестанут работать списки баджан из-за того, как фильтр `where` трактует имя файла, состоящее из цифр.
В версии 3.9, чтобы найти баджану по имени файла, можно было сделать так:

    {% assign bhajan = site.bhajans | where: "slug", "0004" | first %}
    
В версии >= 4 нужно передавать цифру:

    {% assign bhajan = site.bhajans | where: "slug", 4 | first %}
    
В [тестах фильтров](https://github.com/jekyll/jekyll/blob/master/test/test_filters.rb) можно посмотреть тест *filter objects with numerical properties*.
    
В файле `_layouts/b-list.html` нужно будет преобразовывать строку в цифру:

    {% assign num_slug = bhajan_slug | ceil %}
    {% assign bhajan = site.bhajans | where: "slug", num_slug | first %}

