const DEFAULT_SQUARES = 64;

const BUTTON_CLEAR = document.getElementById("button_clear");
const BUTTON_MONOCHROME = document.getElementById("button_monochrome");
const BUTTON_RAINBOW = document.getElementById("button_rainbow");
const BUTTON_GRADIENT = document.getElementById("button_gradient");
const DIV_CONTAINER = document.getElementById("container");
const DIV_CONTAINER_STYLE = getComputedStyle(DIV_CONTAINER);
const GRID_WIDTH = DIV_CONTAINER_STYLE.width.slice(0, DIV_CONTAINER_STYLE.width.indexOf("px"));

let currentSquares = 0;
let isMonochrome = true;
let isRainbow = false;
let isGradient = false;

// Renders a new grid of the specified size when clicked
BUTTON_CLEAR.addEventListener("click", () => {
    let squares = 0;
    do {
        squares = parseInt(prompt("Enter grid size (1 - 200)", DEFAULT_SQUARES));

    } while (squares <= 0 || squares > 200 || squares == NaN);

    clearNode(DIV_CONTAINER);
    render(squares, "ivory");
});

BUTTON_MONOCHROME.addEventListener("click", () => {
    if (!isMonochrome) {
        isRainbow = false;
        isGradient = false;
        isMonochrome = true;
    }
});

BUTTON_RAINBOW.addEventListener("click", () => {
    if (!isRainbow) {
        isMonochrome = false;
        isGradient = false;
        isRainbow = true;
    }
});

BUTTON_GRADIENT.addEventListener("click", () => {
    if (!isGradient) {
        isMonochrome = false;
        isRainbow = false;
        isGradient = true;
    }
});

// Start
render(DEFAULT_SQUARES, "ivory");

/**
 * Displays a grid of squares with the area equal to the parameter squared.
 * 
 * @param squares the number of squares per side of the grid.
 */
function render(squares, color) {
    currentSquares = squares;

    let divs = getDivArray(squares * squares);

    styleDivSquares(divs, squares, color);
    addMouseHoverEvents(divs);
    appendChildren(DIV_CONTAINER, divs);
}

/**
 * Returns an array of the given size containing new div elements.
 * 
 * @param  size the number of div elements.
 * @return      an array of div elements.
 */
function getDivArray(size) {
    let divs = [];
    for (let i = 0; i < size; i++) {
        divs[i] = document.createElement("div");
    }
    return divs;
}

/**
 * Applies CSS styles to each div element in the given array.
 * 
 * @param divs    an array of div elements.
 * @param squares the number of squares per side of the grid. Needed to
 *                calculate square dimensions.
 */
function styleDivSquares(divs, squares, color) {
    for (let div of divs) {
        div.style.width = GRID_WIDTH / squares + "px";
        div.style.height = GRID_WIDTH / squares + "px";
        div.style.background = color;
        div.style.opacity = 1;
    }
}

/**
 * Appends the nodes in the given array to the given parent node.
 * 
 * @param parent   the parent node.
 * @param children an array of nodes to be appended.
 */
function appendChildren(parent, children) {
    for (let child of children) {
        parent.appendChild(child);
    }
}

/**
 * Adds mouse hover events to the nodes in the given array.
 * 
 * @param nodes an array of nodes.
 */
function addMouseHoverEvents(nodes) {
    for (let node of nodes) {
        node.onmouseover = () => {
            if (isRainbow) {
                node.style.opacity = 1;
                node.style.background = getRandomRGB();
            } else if (isGradient) {
                node.style.background = "black";
                if (node.style.opacity == 1) {
                    node.style.opacity = 0;
                }
                if (node.style.opacity < 0.9) {
                    node.style.opacity = (parseFloat(node.style.opacity) + 0.1).toFixed(2);
                }
            } else if (isMonochrome) {
                node.style.opacity = 1;
                node.style.background = "black";
            }
        }
    }
}

/**
 * Removes all child nodes from the given parent node.
 * 
 * @param node the parent node.
 */
function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.childNodes[0]);
    }
}

/**
 * Returns a random RGB color.
 * 
 * @return a string representation of the CSS rgb() function with
 *         random arguments.
 */
function getRandomRGB() {
    return "rgb(" + (Math.floor(Math.random() * 256)) + "," +
            (Math.floor(Math.random() * 256)) + "," + 
            (Math.floor(Math.random() * 256)) + ")";
}