const repChars = ".+;>#2eb/-?Q~*&$%"

let euclid = ({x: x1, y: y1}, {x: x2, y: y2}) => Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )

async function voronoi(width, height, points) {
    for (let y = 0; y < height; y++) {
    	for (let x = 0; x < width; x++) {
	    const currentPoint = {x: x, y: y}
	    
	    // Algorithm for finding the closest point
	    let nearest = points[0];
	    for (point of points) {
	        if (euclid(currentPoint, point) < euclid(currentPoint, nearest)) {
		    nearest = point;
	        }
	    }

	    if (euclid(currentPoint, nearest) == 0) {
		process.stdout.write("()");
		continue;
	    }

	    process.stdout.write(repChars[points.indexOf(nearest)]);
	    process.stdout.write(repChars[points.indexOf(nearest)]);
	}
	process.stdout.write("\n");
    }
}

async function generateDiagram(width, height, points) {
    console.log("Generating voronoi diagram...");
    await voronoi(width, height, points);
}

const args = process.argv.slice(2);

let width = 10;
let height = 10;

if (args.includes("-w")) {
    if (args.indexOf("-w") + 1 >= args.length) throw "No arguments for -w flag provided";
    width = parseInt(args[args.indexOf("-w") + 1]);
}

if (args.includes("-h")) {
    if (args.indexOf("-h") + 1 >= args.length) throw "No arguments for -h flag provided";
    height = parseInt(args[args.indexOf("-h") + 1]);
}

if (args.includes("-n")) {
    // get next arg (throw if invalid) and set that to the amount of points
    if (args.indexOf("-n") + 1 >= args.length) throw "No argument for -n flag provided";
    const numOfPoints = parseInt(args[args.indexOf("-n") + 1])
    
    if (numOfPoints >= repChars.length) throw "Too many points, not enough characters";

    let points = []
    for (let i = 0; i < numOfPoints; i++) {
	points.push({x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)})
    }
    generateDiagram(width, height, points);
    return;
}

generateDiagram(width, height, [{x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)}, {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)}]);

