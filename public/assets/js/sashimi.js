$(function () {

    // Enjoy Button (when you eat/reorder the sushi) Click Event Handler
    $('.shift').on('click', function (event) {
        const id = $(this).data('id');
        console.log(id);
        const newME = $(this).data('newme');
        const meChange = {
            mindfully_eaten: newME
        };
        console.log(meChange);

        // PUT Request
        $.ajax(`/api/sushi/${id}`, {
            type: 'PUT',
            data: meChange
        }).then(
            function () {
                console.log(`changed mindfully eaten to ${newME}`);
                location.reload()
            });

    });

    // Button to add a new sushi type form submit event.
    $('#add-sushi').on('submit', function (event) {
        event.preventDefault();

        const newSushi = {
            sushi_name: $('#add-sushi-name').val().trim(),
            mindfully_eaten: $('[name=m-e]:checked').val().trim()
        };

        console.log(newSushi)
        $.ajax('/api/sushi', {
            type: 'POST',
            data: newSushi
        }).then(
            function () {
                console.log('added new sushi');
                location.reload()
            });
    });

    // Delete sushi button event handler
    $('.delete-sushi').on('click', function () {
        const id = $(this).data('id');
        console.log(`Delete ${id}`);

        $.ajax(`/api/sushi/${id}`, {
            type: 'DELETE'
        }).then(
            function () {
                console.log(`Deleted ${id}`);
                location.reload()
            });
    });

});