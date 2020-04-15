let task = 0;

function initializeComponent()
{
    if (document.title === "Searching")
    {
        document.getElementById("ls").addEventListener("click", linearSearch);
        document.getElementById("bs").addEventListener("click", binarySearch);
    }
    else if (document.title === "Sorting")
    {
        document.getElementById("bs").addEventListener("click", bubbleSort);
        document.getElementById("is").addEventListener("click", insertionSort);
        document.getElementById("qs").addEventListener("click", quickSort);
    }
}

function makeNDivArray(n, s)
{
    let can = document.getElementsByClassName("maincanvas")[0];
    can.textContent = "";
    let size = s;
    let earray = [];
    for (let i = 0; i < n; i++)
    {
        let e = document.createElement("div");
        can.appendChild(e);
        e.style.position = "absolute"
        e.style.top = size + "px";
        e.style.left = i * size + "px";
        e.style.width = size + "px";
        e.style.height = size + "px";
        e.style.border = "2px solid black";
        e.style["background-color"] = "green";
        e.style.color = "white";
        e.style["text-align"] = "center";
        e.style["line-height"] = size + "px";
        e.textContent = (Math.floor(Math.random() * 20)).toString();
        earray.push(e);
    }
    return earray
}

function makeSearchValue(n, s)
{
    let size = s;
    let value = document.createElement("div");
    let can = document.getElementsByClassName("maincanvas")[0];
    can.appendChild(value);
    value.style.position = "absolute"
    value.style.top = 3 * size + "px";
    value.style.left = Math.floor(n  / 2) * size + "px";
    value.style.width = size + "px";
    value.style.height = size + "px";
    value.style.border = "2px solid black";
    value.style["background-color"] = "green";
    value.style.color = "white";
    value.style["text-align"] = "center";
    value.style["line-height"] = size + "px";
    value.textContent = (Math.floor(Math.random() * 20)).toString();
    return value;
}

function quickSort()
{
    clearTimeout(task);
    let size = 40;
    let n = 9;
    let earray = makeNDivArray(n, size);
    qSort(earray, n, 0, size);
}

async function qSort(earray, high, low, size)
{
    if (high == low) return;
    if (high - low == 1)
    {
        await flashRed(earray[low], earray[low]);
        earray[low].style["border-radius"] = size / 2 + "px";
        return;
    }
    if (high - low == 2)
    {
        if (Number(earray[low].textContent) > Number(earray[low + 1].textContent))
        {
            await flashRed(earray[low], earray[low + 1]);
            await exchange(earray, low, low + 1, size);
        }
        await flashRed(earray[low], earray[low + 1]);
        earray[low].style["border-radius"] = size / 2 + "px";
        earray[low + 1].style["border-radius"] = size / 2 + "px";
        return;
    }
    let pivot = Math.floor((high + low) / 2);
    await flashRed(earray[pivot], earray[pivot]);
    earray[pivot].style["border-radius"] = size / 2 + "px";
    let i, j;
    i = low;
    j = high - 1;
    loop1:
    for (;;)
    {
        loop2:
        for (;;)
        {
            await flashRed(earray[i], earray[pivot]);
            if (Number(earray[i].textContent) <= Number(earray[pivot].textContent))
		    {
			    i++;
			    if (i == pivot) break loop1;
			    continue;
            }
            break;
        }
        loop3:
        for (;;)
        {
            await flashRed(earray[j], earray[pivot]);
		    if (Number(earray[j].textContent) >= Number(earray[pivot].textContent))
		    {
			    j--;
			    if (j == pivot) break loop1;
			    continue;
		    }
		    await exchange(earray, i, j, size);
		    i++;
		    if (i == pivot) break loop1;
		    j--;
            if (j == pivot) break loop1;
            break;
        }
    }
    if (i == pivot)
	{
		i = j;
    }
    while (i != pivot)
	{
		if (i < pivot)
		{
            await flashRed(earray[i], earray[pivot]);
			if (Number(earray[i].textContent) <= Number(earray[pivot].textContent))
			{
				i++;
				continue;
			}
			else
			{
				await exchange(earray, Math.min(i, pivot), Math.max(i, pivot), size);
                let temp = i;
                i = pivot;
                pivot = temp;
				i--;
				continue;
			}
		}
		else
		{
            await flashRed(earray[i], earray[pivot]);
			if (Number(earray[i].textContent) >= Number(earray[pivot].textContent))
			{
				i--;
				continue;
			}
			else
			{
				await exchange(earray, Math.min(i, pivot), Math.max(i, pivot), size);
                let temp = i;
                i = pivot;
                pivot = temp;
				i++;
				continue;
			}
        }
    }
    await qSort(earray, pivot, low, size);
    await qSort(earray, high, pivot + 1, size);
}

async function insertionSort()
{
    clearTimeout(task);
    let size = 40;
    let n = 9;
    let earray = makeNDivArray(n, size);
    for (let i = 1; i < n; i++)
    {
        let element = earray[i];
        await flashRed(element, element);
        await moveDown(element, 2 * size);
        for (var j = i - 1; j >= 0; j--)
        {
            await flashRed(element, earray[j]);
            if (Number(element.textContent) < Number(earray[j].textContent))
            {
                await moveRightLeft(earray[j], element, j * size + size);
                earray[j + 1] = earray[j];
            }
            else
            {
                break;
            }
        }
        await moveUp(element, size);
        earray[j + 1] = element;
    }
    
}



async function bubbleSort()
{
    clearTimeout(task);
    let size = 40;
    let n = 9;
    let earray = makeNDivArray(n, size);
    let issorted = true;
    for (let k = n - 1; k > 0; k--)
    {
        issorted = true;
        for (let i = 0; i < k; i++)
        {
            await flashRed(earray[i], earray[i + 1]);
            if (Number(earray[i].textContent) > Number(earray[i + 1].textContent))
            {
                issorted = false;
                await exchange(earray, i, i + 1, size);
            }
        }
        if (issorted == true) break;
    }
}



async function binarySearch()
{
    clearTimeout(task);
    let size = 40;
    let n = 9;
    let earray = makeNDivArray(n, size);
    let numarray = [];
    for (let i = 0; i < n; i++)
    {
        numarray[i] = Math.floor(Math.random() * 20);       
    }
    numarray.sort((a, b) => a - b);
    for (let i = 0; i < n; i++)
    {
        earray[i].textContent = numarray[i].toString();       
    }
    let value = makeSearchValue(n, size);
    let high = n;
    let low = 0;
    await flashRed(value, value);
    await moveUp(value, 2 * size);
    for (;;)
    {
        let pivot = Math.floor((high + low) / 2);
        let destination = earray[pivot].style.left;
        destination = Number(destination.substring(0, destination.length - 2));
        let position = value.style.left;
        position = Number(position.substring(0, position.length - 2));
        if (position < destination)
        {
            await moveRight(value, destination);
        }
        else if (position > destination)
        {
            await moveLeft(value, destination);
        }
        await flashRed(value, earray[pivot]);
        if (Number(value.textContent) == Number(earray[pivot].textContent))
        {
            let e = document.createElement("div");
            let can = document.getElementsByClassName("maincanvas")[0];
            can.appendChild(e);
            e.style.position = "absolute"
            e.style.top = 3 * size + "px";
            e.style["background-color"] = "black";
            e.style.color = "white";
            e.textContent = "Element found at index " + pivot;
            return;
        }
        else if (Number(value.textContent) > Number(earray[pivot].textContent))
        {
            if (pivot == low)
            {
                let e = document.createElement("div");
                let can = document.getElementsByClassName("maincanvas")[0];
                can.appendChild(e);
                e.style.position = "absolute"
                e.style.top = 3 * size + "px";
                e.style["background-color"] = "black";
                e.style.color = "white";
                e.textContent = "Element not found";
                return;
            }
            low = pivot + 1;
        }
        else
        {
            if (pivot == low)
            {
                let e = document.createElement("div");
                let can = document.getElementsByClassName("maincanvas")[0];
                can.appendChild(e);
                e.style.position = "absolute"
                e.style.top = 3 * size + "px";
                e.style["background-color"] = "black";
                e.style.color = "white";
                e.textContent = "Element not found";
                return;
            }
            high = pivot;
        }
    }
}


async function linearSearch()
{
    clearTimeout(task);
    let size = 40;
    let n = 9;
    let earray = makeNDivArray(n, size);
    let value = makeSearchValue(n, size);
    await flashRed(value, value);
    await moveUp(value, 2 * size);
    await moveLeft(value, 0);
    for (let i = 0; i < n; i++)
    {
        await flashRed(value, earray[i]);
        if (value.textContent === earray[i].textContent)
        {
            let e = document.createElement("div");
            let can = document.getElementsByClassName("maincanvas")[0];
            can.appendChild(e);
            e.style.position = "absolute"
            e.style.top = 3 * size + "px";
            e.style["background-color"] = "black";
            e.style.color = "white";
            e.textContent = "Element found at index " + i;
            return;
        }
        await moveRight(value, i * size + size);
    }
    let e = document.createElement("div");
    let can = document.getElementsByClassName("maincanvas")[0];
    can.appendChild(e);
    e.style.position = "absolute"
    e.style.top = 3 * size + "px";
    e.style["background-color"] = "black";
    e.style.color = "white";
    e.textContent = "Element not found";
}

async function exchange(array, index1, index2, size)
{
    await moveDownUp(array[index1], array[index2], 2 * size);
    await moveRightLeft(array[index1], array[index2], index2 * size);
    await moveDownUp(array[index2], array[index1], size);
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

async function moveRightLeft(element1, element2, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(mrl(element1, element2, destination), 0));
        });
        let condition = await p;
        if (!condition) break;
    }
}

function mrl(element1, element2, destination)
{
    let x = element1.style.left;
    x = Number(x.substring(0, x.length - 2));
    let y = element2.style.left;
    y = Number(y.substring(0, y.length - 2));
    if (x < destination)
    {
        x++;
        y--;
        element1.style.left = x + "px";
        element2.style.left = y + "px";
        return true;
    }
    else
    {
        return false;
    }
}


async function moveDownUp(element1, element2, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(mdu(element1, element2, destination), 0));
        });
        let condition = await p;
        if (!condition) break;
    }
}

function mdu(element1, element2, destination)
{
    let x = element1.style.top;
    x = Number(x.substring(0, x.length - 2));
    let y = element2.style.top;
    y = Number(y.substring(0, y.length - 2));
    if (x < destination)
    {
        x++;
        y--;
        element1.style.top = x + "px";
        element2.style.top = y + "px";
        return true;
    }
    else
    {
        return false;
    }
}

async function moveDown(element, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(md(element, destination)), 0);
        });
        let condition = await p;
        if (!condition) break;
    }
}

function md(element, destination)
{
    let x = element.style.top;
    x = Number(x.substring(0, x.length - 2));
    if (x < destination)
    {
        x++;
        element.style.top = x + "px";
        return true;
    }
    else
    {
        return false;
    }
}

async function moveUp(element, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(mu(element, destination)), 0);
        });
        let condition = await p;
        if (!condition) break;
    }
}

function mu(element, destination)
{
    let x = element.style.top;
    x = Number(x.substring(0, x.length - 2));
    if (x > destination)
    {
        x--;
        element.style.top = x + "px";
        return true;
    }
    else
    {
        return false;
    }
}

async function moveLeft(element, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(ml(element, destination)), 0);
        });
        let condition = await p;
        if (!condition) break;
    }
}

function ml(element, destination)
{
    let x = element.style.left;
    x = Number(x.substring(0, x.length - 2));
    if (x > destination)
    {
        x--;
        element.style.left = x + "px";
        return true;
    }
    else
    {
        return false;
    }
}

async function moveRight(element, destination)
{
    for (;;)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(mr(element, destination)), 0);
        });
        let condition = await p;
        if (!condition) break;
    }
}

function mr(element, destination)
{
    let x = element.style.left;
    x = Number(x.substring(0, x.length - 2));
    if (x < destination)
    {
        x++;
        element.style.left = x + "px";
        return true;
    }
    else
    {
        return false;
    }
}

async function flashRed(element1, element2)
{
    for (let i = 0; i < 3; i++)
    {
        let p = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(fr(element1, element2)), 500);
        });
        await p;
        let q = new Promise(function(resolve, reject)
        {
            task = setTimeout(() => resolve(fb(element1, element2)), 500);
        });
        await q;
    }
}


function fr(element1, element2)
{
    element1.style["border-color"] = "red";
    element2.style["border-color"] = "red";
}

function fb(element1, element2)
{
    element1.style["border-color"] = "black";
    element2.style["border-color"] = "black";
}