const localData = new Object();
const doc = document.firstElementChild
const data = ((id, text) => {
    localData[id] = text
})

addEventListener('input', e => {
    if ($('input:focus').val() === 'dark' || $('input:focus').val() === 'light'){
        data('theme', $('input:focus').val())
    } else {
        data($('input:focus').attr('id'), $('input:focus').val())
    }
})

function checkLocalStorage() {

    let retrievedData;

    localStorage.getItem('localData') ? retrievedData = JSON.parse(localStorage.getItem('localData')) : '';

    if(retrievedData) {

        if (retrievedData.company__title) {
            $('#company__title').val(retrievedData.company__title)
        }

        if (retrievedData.select__day) {
            $('#select__day').text(retrievedData.select__day);
        }

        if (retrievedData.select__width) {
            $('#select__width').text(retrievedData.select__width)
        }

        if (retrievedData.select__projects) {
            $('#select__projects').text(retrievedData.select__projects)
        }

        if (retrievedData.size) {
            $('#size').val(retrievedData.size)
        }

        if (retrievedData.first__code) {
            $('#first__code').val(retrievedData.first__code)
        }

        if (retrievedData.second__code) {
            $('#second__code').val(retrievedData.second__code)
        }

        if (retrievedData.third__code) {
            $('#third__code').val(retrievedData.third__code)
        }

        if ((retrievedData.theme) === 'dark') {
            $('#dark').prop('checked', true);
            doc.setAttribute('color-scheme', 'dark');
        } else {
            doc.setAttribute('color-scheme', 'light');
        }
    }
}

checkLocalStorage();

/*Custom select*/
function select() {
    $('.select').on('click', '.select__head', function () {
        if ($(this).hasClass('open focus')) {
            $(this).removeClass('open focus');
            $(this).next().fadeOut();
        } else {
            $('.select__head').removeClass('open focus');
            $('.select__list').fadeOut();
            $(this).addClass('open focus');
            $(this).next().fadeIn();
        }
    });

    $('.select').on('click', '.select__item', function () {
        $('.select__head').removeClass('open focus');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
        data($(this).parent().prev().attr('id'), $(this).text());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.select__head').removeClass('open focus');
            $('.select__list').fadeOut();
        }
    });
}

select();
/*End custom select*/

$('#cancel').on('click', function () {
    $('#select-day').text('Monday');
    $('#select-width').text('Fixed')
    $('#select-projects').text('Starred Projects');
    data('theme', 'light');
})

$('#save').on('click', function () {
    localStorage.setItem('localData', JSON.stringify(localData))
    $('#myForm').submit();
})