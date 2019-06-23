SELECT
  typzgloszen.id as typZgloszeniaID,
  oferta.id,
  typzgloszen.nazwa as typZgloszenia,
  oferta.nazwa,
  concat(
    if(oferta.cenaOd = 1, 'od ', ''),
    oferta.cena,
    ' zł'
  ) as cena
from
  oferta
  inner join typzgloszen on (oferta.typZgloszeniaId = typzgloszen.id)
order by
  typZgloszenia asc,
  oferta.nazwa asc