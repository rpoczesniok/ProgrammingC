SELECT 
    formkontaktowy.id,
    typzgloszen.nazwa as typZgloszenia, 
    formkontaktowy.imieNazwisko,
    formkontaktowy.email,
    formkontaktowy.telefon,
    formkontaktowy.tresc
from formkontaktowy inner join typzgloszen on (formkontaktowy.typZgloszeniaId = typzgloszen.id)
order by typZgloszenia asc, formkontaktowy.data desc