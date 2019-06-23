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
  typzgloszen
  left outer join oferta on (oferta.typZgloszeniaId = typzgloszen.id)
order by
  typZgloszenia asc,
  oferta.nazwa asc