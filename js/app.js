// Defines and initialises application object

// Uses name spaced object literals to, reduce risk of polluting global namespace, assist in logical organisation of code, reduce likely of collisions occurring in tests */

if (typeof module === "undefined") {
    // Declare root object
    var fruits;
    // Initialise root object, checks if already exists
    fruits = fruits || {};
    // Declare and initialise kata object
    fruits.kata = fruits.kata || {};
    // Declare and initialise checkout object
    fruits.kata.checkout = {};
}