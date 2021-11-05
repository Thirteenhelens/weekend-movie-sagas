function Details() {
    return(
        <>
        <p>DetailsPage</p>
        </>
    )
}

export default Details;

// This should show all details **including ALL genres** for the selected movie. You will need to store this data in redux!
// TODO: The details page should have a `Back to List` button, which should bring the user to the Home/List Page
// Hint : You can make a GET request for a specific movie. Remember `req.params` and `:id`?
// Base functionality does not require the movie details to load correctly after refresh of the browser.