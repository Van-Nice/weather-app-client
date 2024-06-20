export function kelvinToFahrenheit(kelvin) {
    const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
    return fahrenheit;
}

export function kelvinToCelsius(kelvin) {
    const celsius = Math.round(kelvin - 273.15);
    return celsius;
}

export function capitalizeFirstLetterOfEachWord(str) {
    // Split the string into words
    const words = str.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the words back into a single string
    const capitalizedStr = capitalizedWords.join(' ');

    return capitalizedStr;
}