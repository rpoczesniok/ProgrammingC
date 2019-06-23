function WstawEtykiete(element, tresc) {
    const divParent = element.closest('div');
    const errorTekst = divParent.querySelector('.error-tresc');
    if (tresc === '') {
        if (errorTekst !== null) {
            errorTekst.remove();
        }
    } else {
        if (errorTekst === null) {
            const errorTekstTmp = document.createElement('div');
            errorTekstTmp.classList.add('error-tresc');
            errorTekstTmp.innerHTML = tresc;
            element.appendChild(errorTekstTmp);
        } else {
            errorTekst.innerHTML = tresc;
        }
    }
}

function wymagalnoscPola(pole, czyPoprawne, tresc) {
    let divParent = null

    if (!$(pole.form).hasClass('header-logowanie-form')) {
        divParent = pole.closest('div');
    } else {
        divParent = pole.closest('.header-logowanie');
    }

    if (czyPoprawne) {
        pole.parentElement.classList.remove('error');

        WstawEtykiete(divParent, '');
    } else {
        pole.parentElement.classList.add('error');

        WstawEtykiete(divParent, tresc);
    }
}

function walidujPole(pole) {
    if (pole.nodeName.toUpperCase() === 'INPUT') {
        const type = pole.type.toUpperCase();

        switch (type) {
            case 'TEXT':
            case 'PASSWORD':
            case 'NUMBER':
                if (pole.value === '') {
                    if ($(pole.form).hasClass('header-logowanie-form')) {
                        wymagalnoscPola(pole, false, 'Konto lub hasło jest nieprawidłowe. <br>Ponów próbę.');
                    } else {
                        wymagalnoscPola(pole, false, 'Uzupełnij pole');
                    }
                    return false;
                } else {
                    wymagalnoscPola(pole, true, '');
                }
                break;
            case 'EMAIL':
                if (pole.value === '') {
                    wymagalnoscPola(pole, false, 'Uzupełnij pole');
                    return false;
                } else {
                    const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

                    if (!mailReg.test(pole.value)) {
                        wymagalnoscPola(pole, false, 'Podana wartość nie jest adresem e-mail');
                        return false;
                    } else {
                        wymagalnoscPola(pole, true, '');
                    }
                }
                break;
        }
    }

    if (pole.nodeName.toUpperCase() === 'TEXTAREA') {
        if (pole.value === '') {
            wymagalnoscPola(pole, false, 'Uzupełnij pole');
            return false;
        } else {
            wymagalnoscPola(pole, true, '');
        }
    }
    return true;
}

function zaladujStrone(strona) {
    const naglowek = document.querySelector('#artykul .artykul-naglowek');
    const tresc = document.querySelector('#artykul .artykul-tresc');
    const grafika = document.querySelector('.logo img');

    tresc.innerHTML = '';

    if (strona === 'hobby') {
        const grafikaParent = grafika.parentNode
        const linkGrafika = document.createElement('a');
        linkGrafika.setAttribute('href', 'https://pl.wikipedia.org/wiki/Pszczo%C5%82a');
        linkGrafika.setAttribute('target', '_blank');

        linkGrafika.appendChild(grafikaParent.children[0])
        grafikaParent.insertBefore(linkGrafika, grafikaParent.querySelector('.data-czas'));
    } else {
        const grafikaParent = document.querySelector('.logo');
        if (grafikaParent.querySelector('a') !== null) {
            const czas = grafikaParent.querySelector('.data-czas');
            grafikaParent.insertBefore(grafika, czas);
            grafikaParent.querySelector('a').remove();
        }

    }

    switch (strona) {
        case 'kontakt':
            naglowek.innerHTML = 'Kontakt';
            tresc.innerHTML = ' <address><b>Nazywam się:</b> Rafał Pocześnik<br><b>Mieszkam:</b> 6629 Bruce St<br><b>Mój numer tel.:</b> (290)-842-8944<br><b>E-mail:</b> bobby.silva27@example.com<address>\
                                    <fieldset>\
                                        <legend>Formularz kontaktowy</legend>\
                                        <form method="post" action="/send.php" id="formularz-kontaktowy">\
                                            <div><label for="typZgloszenia">Typ zgłoszenia</label></div>\
                                            <div id="typZgloszeniaCnt">\
                                            </div>\
                                            <div><label for="imieNazwisko">Imię i nazwisko</label></div>\
                                            <div><input type="text" name="name" id="imieNazwisko" class="formularzPole" required/></div>\
                                            <div><label for="telefon">Numer telefonu</label></div>\
                                            <div><input type="text" name="phone" id="telefon" class="formularzPole" /></div>\
                                            <div><label for="email">Adres email</label></div>\
                                            <div><input type="email" name="email" id="email" class="formularzPole" required/></div>\
                                            <div><label for="wiadomosc">Treść wiadomości</label></div>\
                                            <div><textarea name="message" id="wiadomosc" class="formularzPole" required></textarea></div>\
                                            <div><button id="przyciskWyslij">Wyślij</button></div>\
                                        </form>\
                                    </fieldset>';
            grafika.setAttribute('src', "./grafika/kontakt.jpg");
            const form = document.querySelector('#formularz-kontaktowy');
            form.setAttribute('novalidate', 'novalidate');

            const elements = form.querySelectorAll('[required]');

            elements.forEach(function (el) {
                el.addEventListener('input', function (e) {
                    walidujPole(this);
                })
            })

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                let czyFormZwalidowany = true;
                const elements = form.querySelectorAll('[required]');
                elements.forEach(function (el) {
                    if (!walidujPole(el)) {
                        czyFormZwalidowany = false;
                    };
                })

                if (czyFormZwalidowany) {
                    const typZgloszenia = document.getElementById('typZgloszenia').value;
                    const imeNazwisko = this['name'].value;
                    const nrTel = this['phone'].value;
                    const email = this['email'].value;
                    const tresc = this['message'].value;

                    $.ajax({
                            url: "PHP/kontakt.php",
                            method: "post",
                            dataType: "json",
                            context: e.target,
                            data: {
                                operacja: 1,
                                typZgloszenia: typZgloszenia,
                                imieNazwisko: imeNazwisko,
                                tel: nrTel,
                                email: email,
                                tresc: tresc
                            }
                        })
                        .done(function (res) {
                            if (res.status = 1) {
                                this.reset();
                                alert('Formularz został poprawnie wysłany.');
                            } else {
                                alert('Wystąpił problem podczas wysyłania formularza.');
                            }
                        })
                        .fail(function () {
                            alert('Wystąpił problem podczas wysyłania formularza.');
                        });
                }

            })

            $('#typZgloszeniaCnt').load("./PHP/typZgloszenia.php", "data", function (response, status, request) {
                this; // dom element

            });
            break;
        case 'formKontakt': {
            const naglowekNazwa = ['Imię i Nazwisko', 'E-mail', 'Telefon', 'Treść zgłoszenia', ''];

            naglowek.innerHTML = 'Zgłoszenia';
            grafika.setAttribute('src', "./grafika/kontakt.jpg");
            const formTable = document.createElement('table');
            const formNaglowek = document.createElement('tr');
            formNaglowek.classList.add('naglowek');

            naglowekNazwa.forEach(function (el) {
                const th = document.createElement('th');
                th.innerText = el;
                formNaglowek.appendChild(th);
            })

            formTable.appendChild(formNaglowek);

            $.ajax({
                    url: "PHP/kontakt.php",
                    method: "post",
                    dataType: "json",
                    data: {
                        operacja: 2
                    }
                })
                .done(function (res) {
                    if (res.status === 1) {
                        if (Array.isArray(res.dane)) {
                            if (res.dane.length > 0) {
                                let typZgloszenia = '';
                                $.each(res.dane, function (indexInArray, valueOfElement) {
                                    if (typeof valueOfElement === 'object' && valueOfElement !== null) {
                                        const tr = document.createElement('tr');
                                        let id = 0;
                                        for (x in valueOfElement) {
                                            switch (x) {
                                                case 'typZgloszenia':
                                                    if (typZgloszenia !== valueOfElement[x]) {
                                                        typZgloszenia = valueOfElement[x];
                                                        const tr = document.createElement('tr');
                                                        tr.classList.add('typZgloszenia');
                                                        const th = document.createElement('th');
                                                        th.innerText = typZgloszenia;
                                                        th.setAttribute('colspan', 5);
                                                        tr.appendChild(th);
                                                        formTable.appendChild(tr);
                                                    }
                                                    break;
                                                case 'id':
                                                    id = valueOfElement[x];
                                                    break;
                                                default:
                                                    const td = document.createElement('td');
                                                    td.innerText = valueOfElement[x];
                                                    tr.appendChild(td);
                                                    break;
                                            }
                                        }

                                        const td = document.createElement('td');
                                        td.classList.add('buttons');
                                        const button = document.createElement('button');
                                        button.classList.add('delete');
                                        button.innerHTML = '<i class="material-icons">delete_outline</i>';
                                        button.setAttribute('data-id', id);
                                        td.appendChild(button);
                                        tr.appendChild(td);
                                        formTable.appendChild(tr);
                                    }
                                });

                                $('td.buttons button.delete').click(function (e) {
                                    e.preventDefault();

                                    const formId = this.getAttribute('data-id');

                                    $.ajax({
                                            url: "PHP/kontakt.php",
                                            method: "post",
                                            dataType: "json",
                                            context: e.currentTarget,
                                            data: {
                                                operacja: 3,
                                                id: formId
                                            }
                                        })
                                        .done(function (res) {
                                            if (res.status === 1) {

                                                $(this.closest('tr')).toggle('slow', function () {
                                                    this.remove();
                                                });
                                            } else {
                                                alert('Wystąpił problem podczas usuwania.');
                                            }
                                        })
                                        .fail(function () {
                                            alert('Wystąpił problem podczas usuwania.');
                                        });
                                });
                            }
                        }

                    }
                })
                .fail(function () {
                    alert('Wystąpił problem podczas pobierania danych.');
                });

            tresc.appendChild(formTable);
        }
        break;
    case 'oferta': {
        const naglowekNazwa = ['Usługa', 'Cena'];
        const naglowekSzerokosc = ['', '8rem'];

        naglowek.innerHTML = 'Oferta';
        grafika.setAttribute('src', "./grafika/oferta-cennik.png");
        const formTable = document.createElement('table');
        const formNaglowek = document.createElement('tr');
        formNaglowek.classList.add('naglowek');

        naglowekNazwa.forEach(function (el, key) {
            const th = document.createElement('th');
            th.innerText = el;
            if (naglowekSzerokosc[key] !== '') {
                th.style.width = naglowekSzerokosc[key];
            }
            formNaglowek.appendChild(th);
        })

        formTable.appendChild(formNaglowek);

        $.ajax({
                url: "PHP/oferta.php",
                method: "post",
                dataType: "json",
                data: {
                    operacja: 2
                }
            })
            .done(function (res) {
                if (res.status === 1) {
                    if (res.zalogowany === 1) {
                        formNaglowek.appendChild(document.createElement('th'));
                    }

                    if (Array.isArray(res.dane)) {
                        if (res.dane.length > 0) {
                            let typZgloszenia = '';
                            let typZgloszeniaId = 0;
                            $.each(res.dane, function (indexInArray, valueOfElement) {
                                if (typeof valueOfElement === 'object' && valueOfElement !== null) {
                                    const tr = document.createElement('tr');
                                    let id = 0;
                                    for (x in valueOfElement) {
                                        switch (x) {
                                            case 'typZgloszeniaID':
                                                typZgloszeniaId = valueOfElement[x];
                                                break;
                                            case 'typZgloszenia':
                                                if (typZgloszenia !== valueOfElement[x]) {
                                                    typZgloszenia = valueOfElement[x];
                                                    const tr = document.createElement('tr');
                                                    tr.classList.add('typZgloszenia');
                                                    const th = document.createElement('th');
                                                    th.innerText = typZgloszenia;

                                                    th.setAttribute('colspan', 2);

                                                    tr.appendChild(th);

                                                    if (res.zalogowany === 1) {
                                                        const th = document.createElement('th');
                                                        th.classList.add('buttons');

                                                        const button = document.createElement('button');
                                                        button.classList.add('add');
                                                        button.innerHTML = '<i class="material-icons">add</i>';
                                                        button.setAttribute('data-typZgloszeniaId', typZgloszeniaId);
                                                        th.appendChild(button);

                                                        tr.appendChild(th);
                                                    }
                                                    formTable.appendChild(tr);
                                                }
                                                break;
                                            case 'id':
                                                id = valueOfElement[x];
                                                break;
                                            default:
                                                const td = document.createElement('td');
                                                td.innerText = valueOfElement[x];
                                                tr.appendChild(td);
                                                break;
                                        }
                                    }

                                    if (res.zalogowany === 1) {
                                        const td = document.createElement('td');
                                        td.classList.add('buttons');
                                        const button = document.createElement('button');
                                        button.classList.add('delete');
                                        button.innerHTML = '<i class="material-icons">delete_outline</i>';
                                        button.setAttribute('data-id', id);
                                        td.appendChild(button);
                                        tr.appendChild(td);
                                    }

                                    if (id !== null) {
                                        formTable.appendChild(tr);
                                    }
                                }
                            });

                            $('td.buttons button.delete').click(function (e) {
                                e.preventDefault();

                                const formId = this.getAttribute('data-id');

                                $.ajax({
                                        url: "PHP/oferta.php",
                                        method: "post",
                                        dataType: "json",
                                        context: e.currentTarget,
                                        data: {
                                            operacja: 3,
                                            id: formId
                                        }
                                    })
                                    .done(function (res) {
                                        if (res.status === 1) {

                                            $(this.closest('tr')).toggle('slow', function () {
                                                this.remove();
                                            });
                                        } else {
                                            alert('Wystąpił problem podczas usuwania.');
                                        }
                                    })
                                    .fail(function () {
                                        alert('Wystąpił problem podczas usuwania.');
                                    });
                            });

                            $('th.buttons button.add').click(function (e) {
                                e.preventDefault();

                                const typZgloszeniaID = this.getAttribute('data-typZgloszeniaId');

                                const popup = document.createElement('div');
                                popup.id = 'popup';
                                popup.classList.add('popup');

                                const form = document.createElement('form');
                                form.setAttribute('action', '#');

                                const formHtml = '<div><label for="usluga">Usługa</label></div>\
                                <div><textarea name="usluga" id="usluga" class="formularzPole" required></textarea></div>\
                                <div><label for="cena">Cena</label></div>\
                                <div><input type="number" min="0.00" max="10000.00" step="0.01" name="cena" id="cena" class="formularzPole" required /></div>\
                                <div><input type="checkbox" name="cenaOd" id="cenaOd" value="" class="formularzPole" style="width: auto; margin-top: 1rem; margin-right: 0.5rem;"><span>Cena od</span></div>\
                                <div><button id="popup-przyciskWyslij">Dodaj</button></div>';

                                form.innerHTML = formHtml;

                                div = document.createElement('div');
                                const button = document.cre

                                popup.appendChild(form);
                                document.body.appendChild(popup);

                                form.setAttribute('novalidate', 'novalidate');

                                const elements = form.querySelectorAll('[required]');

                                elements.forEach(function (el) {
                                    el.addEventListener('input', function (e) {
                                        walidujPole(this);
                                    })
                                })

                                form.addEventListener('submit', function (e) {
                                    e.preventDefault();
                                    let czyFormZwalidowany = true;
                                    const elements = this.querySelectorAll('[required]');
                                    elements.forEach(function (el) {
                                        if (!walidujPole(el)) {
                                            czyFormZwalidowany = false;
                                        };
                                    })

                                    if (czyFormZwalidowany) {
                                        const uslugaText = this['usluga'].value;
                                        const cena = this['cena'].value;
                                        let cenaOd = 0;

                                        if (this.querySelector('input[name="cenaOd"]:checked') !== null) {
                                            cenaOd = 1;
                                        }

                                        $.ajax({
                                                url: "PHP/oferta.php",
                                                method: "post",
                                                dataType: "json",
                                                context: e.target,
                                                data: {
                                                    operacja: 1,
                                                    typZgloszeniaId: typZgloszeniaID,
                                                    usluga: uslugaText,
                                                    cena: cena,
                                                    cenaOd: cenaOd
                                                }
                                            })
                                            .done(function (res) {
                                                if (res.status = 1) {
                                                    $('#popup').remove();
                                                    zaladujStrone('oferta');
                                                } else {
                                                    alert('Wystąpił problem podczas wysyłania formularza.');
                                                }
                                            })
                                            .fail(function () {
                                                alert('Wystąpił problem podczas wysyłania formularza.');
                                            });
                                    }

                                });
                            });


                        }
                    }

                }
            })
            .fail(function () {
                alert('Wystąpił problem podczas pobierania danych.');
            });

        tresc.appendChild(formTable);

        tresc.appendChild(document.createElement('br'));

        const trescPo = document.createElement('div');
        trescPo.innerText = 'Powyższy cennik określa przybliżone ceny poszczególnych usług informatycznych i nie zawiera w sobie wszystkich czynności które wykonuję, ma charakter informacyjny, nie stanowi oferty handlowej w rozumieniu Art.66 par.1 Kodeksu Cywilnego. W celu uzyskania szczegółowych informacji zapraszam do kontaktu drogą elektroniczną lub telefoniczną.';
        tresc.appendChild(trescPo);
    }
    break;
    default:
        const http_request = new XMLHttpRequest();

        const url = "./dane/" + strona + ".json";

        http_request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const trescJSON = JSON.parse(this.responseText);

                naglowek.innerHTML = trescJSON.naglowek;

                switch (trescJSON.typWWW) {
                    case 'text':
                        tresc.innerHTML = trescJSON.tresc;
                        grafika.setAttribute('src', trescJSON.grafika);

                        break;
                    case 'table':
                        let tableNaglowek = "";
                        let tableWiersze = "";

                        if (trescJSON.tabela.naglowek.length !== trescJSON.tabela.szerokosc.length) {
                            alert('Wystąpił problem w konfiguracji.');
                            return -1;
                        }

                        for (let i = 0; i < trescJSON.tabela.naglowek.length; i++) {
                            let style = ''

                            if (trescJSON.tabela.szerokosc[i] !== '') {
                                style = 'style="width: ' + trescJSON.tabela.szerokosc[i] + '"';
                            }

                            tableNaglowek += '<th ' + style + '>' + trescJSON.tabela.naglowek[i] + '</th>';
                        }

                        tableNaglowek = "<tr>" + tableNaglowek + "</tr>";

                        trescJSON.tabela.wiersze.forEach(function (el) {
                            let wiersz = '';

                            el.forEach(function (el1) {
                                wiersz += '<td>' + el1 + '</td>';
                            })

                            wiersz = "<tr>" + wiersz + "</tr>";

                            tableWiersze += wiersz;
                        })

                        tresc.innerHTML = '<table>' + tableNaglowek + tableWiersze + '</table>';
                        grafika.setAttribute('src', trescJSON.grafika);

                        if (trescJSON.trescPo !== '') {
                            tresc.innerHTML += '<br><div>' + trescJSON.trescPo + '</div>';
                        }

                        break;
                    default:
                        break;
                }
            }
        };

        http_request.open("GET", url, true);
        http_request.send();
        break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // zaladujStrone('index');
    // zaladujStrone('kontakt');
    // zaladujStrone('formKontakt');
    zaladujStrone('oferta');

    const linki = document.querySelectorAll('.nav a');

    linki.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();

            zaladujStrone(e.target.getAttribute('href'));
        })
    });

    /* const form = document.querySelector('#popup form');
    form.setAttribute('novalidate', 'novalidate');


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (this.querySelector('input[name="cenaOd"]:checked') === null) {
            console.log(1);
        } else {
            console.log(2);
        }
    }) */

})