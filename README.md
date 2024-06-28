# Movie Swiper.

Jeg har valgt og prøve javascript frameworket Svelte. Da jeg har aldrig har prøvet det før. Men kan ligeså godt sige det. Det noget være bras. React er bare bedere.

Men det var så vel sjovt at prøve noget nyt. Men så til ideen. Det en ret simpel ide. En hjemmeside hvor man kan "swipe" / gennemgå random film. Lidt ligesom tinder. Man kan så ved være film vælge om man vil tilføje den til sin se-liste. Ret simpelt.

Jeg kunne ikke rigtigt finde en api der kunne sende random film. Så jeg byggede min ejen. (kan findes i `api` mappen). Jeg har brugt "TheMovieDB" api til at finde filmene. Jeg har så brugt `/api/popular` endpointet til at finde de mest populære film. Og så har man et side nr fordi der er ret mange film. `?page{nr}` Så jeg lavede en function der gav et random film side nummer. Også tog jeg bare film fra den side og så sende filmene tilbage.

Backenden er skrevet i typescript, med Hono. (en bedere version af express).
