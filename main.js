var screenX = 70;
var screenY = 70;
var pixel = multidimensionalArray(screenX, screenY);

var chances =
{
	"#F45325": 23, //rojo
	"#81BD06": 25, //verde
	"#05A5EF": 27, //azul
	"#FFBA07": 30 //amarillo
}

function multidimensionalArray(x, y)
{
	multiArray = new Array(x);
	for (i = 0; i < multiArray.length; i++)
	{
		multiArray[i] = new Array(y);
	}
	return multiArray;
}

function chanceOf(percent)
{
	if (Math.floor((Math.random() * 100)) < percent)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function startGame()
{
    myGameArea.start();
    for (x = 0; x < screenX; x++)
    {
    	for (y = 0; y < screenY; y++)
    	{
    		if (x < screenX/2 && y < screenY/2)
			{
				pixel[x][y] = new component(1, 1, "#F45325", x, y); //Rojo
			}
			if (x >= screenX/2 && y < screenY/2)
			{
				pixel[x][y] = new component(1, 1, "#81BD06", x, y); //Verde
			}
			if (x < screenX/2 && y >= screenY/2)
			{
				pixel[x][y] = new component(1, 1, "#05A5EF", x, y); //Azul
			}
    		if (x >= screenX/2 && y >= screenY/2)
			{
				pixel[x][y] = new component(1, 1, "#FFBA07", x, y); //Amarillo
			}
			pixel[x][y].update();
    	}
    }
}

var myGameArea =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width = screenX;
        this.canvas.height = screenY;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1);
    },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function()
    {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.expand = function()
    {
    	if (this.color != "#FFFFFF")
    	{
    		//Arriba
    		if (this.y > 0)
    		{
    			if (this.color != pixel[this.x][this.y-1].color && chanceOf(chances[this.color]))
    			{
    				pixel[this.x][(this.y)-1].color = this.color;
    				chances[this.color]--;
    				chances[pixel[this.x][(this.y)-1].color]++;
    			}
    		}
    		//Derecha
    		if (this.x < screenX - 1)
    		{
    			if (this.color != pixel[this.x+1][this.y].color && chanceOf(chances[this.color]))
    			{
    				pixel[(this.x)+1][this.y].color = this.color;
    				chances[this.color]--;
    				chances[pixel[(this.x)+1][this.y].color]++;
    			}
    		}
    		//Abajo
    		if (this.y < screenY - 1)
    		{
    			if (this.color != pixel[this.x][this.y+1].color && chanceOf(chances[this.color]))
    			{
    				pixel[this.x][(this.y)+1].color = this.color;
    				chances[this.color]--;
    				chances[pixel[this.x][(this.y)+1].color]++;
    			}
    		}
    		//Izquierda
    		if (this.x > 0)
    		{
    			if (this.color != pixel[this.x-1][this.y].color && chanceOf(chances[this.color]))
    			{
    				pixel[(this.x)-1][this.y].color = this.color;
    				chances[this.color]--;
    				chances[pixel[(this.x)-1][this.y].color]++;
    			}
    		}
    	}
    }
}

function updateGameArea()
{
    myGameArea.clear();
    for (x = 0; x < screenX; x++)
    {
    	for (y = 0; y < screenY; y++)
    	{
    		pixel[x][y].expand();
    		pixel[x][y].update();
    	}
    }
}