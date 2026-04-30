# Learning C# and Unity for AR/VR — Class Notes

A running log of concepts from my AR/VR course, covering C# fundamentals through Unity integration.

---

## C# Basics — Hello World and Program Structure

The first thing we looked at was the anatomy of a basic C# program. Everything lives inside a **namespace**, which contains a **class**, which contains the **Main method** — that's your entry point.

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

The hierarchy goes: **Classes → Namespaces → Assembly → Application**. An *assembly* is a collection of related namespaces and includes either DLLs or executables.

- **DLL (Dynamically Linked Library):** Independently linkable, loaded only when needed.
- **EXE (Executable):** Standalone, bundles everything it needs.

Namespaces are basically collections of classes used to group related things together — similar to libraries. You pull them in with `using`:

```csharp
using System;
using System.IO;
```

---

## .NET Framework and the CLR

C# compiles to an **Intermediate Language (IL)** rather than directly to machine code. The IL then gets compiled to native code at runtime by the **CLR (Common Language Runtime)**. This is the same idea as Java's bytecode and JIT compilation — Microsoft borrowed a lot from Java here.

Why IL? Because machine language varies by hardware. IL is portable — shorter to compile than starting from source, and the IL code isn't human-readable, which gives some privacy to your logic.

**Compilation flow:** Source Code → IL → Native/Machine Code

To set up the dev environment in VS Code, you need the C# dev kit, Code Runner, and the .NET SDK. Creating and running a project:

```bash
dotnet new console -n MyNewProject
cd MyNewProject
dotnet run
```

---

## Data Types in C#

C# `char` is **Unicode** (2 bytes), so it can store characters from any language. This is different from ASCII (1 byte, only 256 characters — basically English and punctuation).

- String literals use **double quotes**: `"hello"`
- Char literals use **single quotes**: `'a'`

Always assign a value to a variable before using it — the compiler will complain otherwise.

### The `var` Keyword

`var` is a generalized variable type that works for both primitive and non-primitive types — the compiler infers the type from what you assign to it. You can use it anywhere: loop counters, class instances, collections.

```csharp
var i = 0;                        // inferred as int
var name = "abc";                 // inferred as string
var s1 = new Student();           // works for class instances too
var numbers = new List<int>();    // and collections
```

Especially handy in `for` and `foreach` loops:
```csharp
for (var i = 0; i < 10; i++) { ... }
foreach (var number in array) { ... }
```

### Type Conversion

Three ways to convert between types:

1. **Implicit casting** — automatic, smaller → larger type:
   `char → int → long → float → double`

2. **Explicit casting** — manual, larger → smaller type:
   `double → float → long → int → char`

3. **Conversion functions** — for incompatible types (like string → int):
   ```csharp
   Convert.ToInt32("42");
   int.Parse("42");
   ```

> `int` to `byte` = explicit. `float` to `int` = explicit. But `string` to `int` can't be done with casting at all — you need `Convert.ToInt32()` or `int.Parse()`.

### Constants vs Static

- **`const`**: Value is fixed at compile time, never changes.
- **`static`**: Variable persists in memory for the entire program's lifetime, not just the scope of a function. A regular local variable gets wiped once you leave its function. A static one sticks around.

---

## Operators

### Arithmetic
`+`, `-`, `*`, `/`, `%` (modulus), `++` (increment), `--` (decrement)

If even one operand is a `float`, the whole operation becomes a float. But if both are `int`, the result is an `int` even if you're storing it in a `float`.

```csharp
float z = 5 / 2;      // z = 2 (both ints, integer division)
float z = 5 / 2.0f;   // z = 2.5 (one is float)
```

**Pre vs Post increment:**
```csharp
int a = 5;
int b = a++;  // b = 5, then a becomes 6 (assign first, then increment)
int c = ++a;  // a becomes 7, then c = 7 (increment first, then assign)
```

Note: increment/decrement and `!` (NOT) are **unary** operators — they only take one operand.

### String Concatenation with `+`

The `+` operator doubles as a string concatenation operator when one of the operands is a string. Works with numbers — but *not* with `char`.

```csharp
string result = "Score: " + 42;    // works — "Score: 42"
string result = "Hi" + 'A';        // does NOT concat — 'A' is a char, behaves differently
```

### Logical
`||` (OR), `&&` (AND), `!` (NOT) — in C#, these only work on `bool` values, unlike C where you could use them on numbers.

### Bitwise
`&` (AND), `|` (OR) — these operate on the binary representation of integers, but you pass normal ints and get ints back.

```
5 & 2 = 0    (101 & 010 = 000)
5 & 3 = 1    (101 & 011 = 001)
5 | 2 = 7    (101 | 010 = 111)
```

A useful trick: to check if a number N is odd or even, use `N & 1`. If the result is `1`, it's odd; `0`, it's even.

### Ternary (Shorthand if-else)
```csharp
int max = n1 > n2 ? n1 : n2;
```
Takes three arguments: condition, value if true, value if false.

---

## Control Flow

### Input/Output
```csharp
Console.WriteLine("output");        // Output
string input = Console.ReadLine();  // Input — always reads as string, no matter what
int num = Convert.ToInt32(input);   // Convert if needed
```

> `Console.ReadLine()` always returns a `string` — even if you declared the variable as `int`. You *must* convert it explicitly. This trips people up a lot.

### Loops

**`for`** — when you know the iteration count:
```csharp
for (int i = 0; i < 10; i++) { ... }
```

**`while`** — when you don't know how long you'll loop:
```csharp
while (condition) { ... }
```

**`do-while`** — executes at least once, even if condition is false on the first check.

**`foreach`** — use this specifically when you *don't need* start/stop index variables. You just want every element, nothing more:
```csharp
foreach (var number in array) { ... }
```
Similar to Python's `for x in list` — you get values directly, no index math needed.

---

## Classic Loop Problems

### Count Digits in N
```
while number != 0:
    count += 1
    number = number / 10  (integer division)
print count
```

### Sum of Digits in N
```
sum = 0
while number != 0:
    digit = number % 10
    sum += digit
    number = number / 10
print sum
```

### Armstrong Number Check
A number where the sum of the cubes of its digits equals the original number (e.g., 153 = 1³ + 5³ + 3³).
```
sum = 0
while number != 0:
    digit = number % 10
    sum += digit³
    number = number / 10
if sum == original: yes, else: no
```

---

## Scope of Variables

A variable is only visible to the block it's declared in and any blocks *nested inside* it — not to the parent block above it.

```csharp
void Main() {
    int x = 10;          // visible here and in any inner blocks
    if (true) {
        int y = 20;      // only visible inside this if-block
        Console.WriteLine(x);  // fine — x is from a parent block
    }
    Console.WriteLine(y);  // ERROR — y is out of scope here
}
```

The rule: inner blocks can see outward, but outer blocks can't see inward.

---

**Primitive types:** `int`, `char`, `float`, `double`

**Derived types:**
- **Arrays** — homogeneous (same type)
- **Structs** — heterogeneous (mixed types)

```c
struct Point {
    int x;
    int y;
};

struct Point p1 = {0, 1};
printf("(%d, %d)\n", p1.x, p1.y);
```

A struct lets you create a user-defined data type that groups different kinds of data together — something an array can't do.

---

## Classes and Object-Oriented Programming

A **class** is a blueprint. An **object** is an instance of that class. Think of universals vs particulars — the class is the universal concept, objects are the specific instances.

```csharp
public class Animal {
    public string name;
    public void Speak() {
        Console.WriteLine(name + " speaks.");
    }
}

Animal dog = new Animal();
dog.name = "Dog";
dog.Speak();
```

`new Animal()` allocates space in memory for the object — similar to `malloc` in C, but you don't have to manually free it.

### Attributes and Methods

A **method** is a function that belongs to a class. The difference: methods can access and modify the class's internal data.

```csharp
public class Calculator {
    private int result;

    public int Add(int number) {
        result += number;
        return result;
    }
}
```

`void` means the method doesn't return anything — just runs and exits. Note: *printing* and *returning* are different things.

### `public` vs `static` members

- `public int age` — accessible via an instance (`p1.age`)
- `public static int count` — accessible directly from the class (`Person.count`), not through an instance

---

## Constructors

A constructor is a special method that runs automatically when an object is created. Rules:
- Same name as the class
- No return type

```csharp
public class Student {
    public string name;
    public int age;
    public int semester;
    public List<Course> courseList;

    // Default constructor
    public Student() {
        semester = 8;
        courseList = new List<Course>();
    }

    // Constructor with semester override
    public Student(int sem) : this() {
        this.semester = sem;
    }

    // Full constructor
    public Student(string name, int age, int sem) : this(sem) {
        this.name = name;
        this.age = age;
    }
}
```

A few things worth noting:

- You can't assign default values directly in the field declaration inside a class. That's what constructors are for.
- Default values for common types if not set: `int` → 0, `bool` → false, `string` → null.
- Non-primitive types like `List<>` need explicit memory allocation (`new List<Course>()`) — constructors are the right place for this.
- **`this`** refers to the current instance. It's also used to chain constructors using `: this()`.
- **Constructor signatures** must differ — no two constructors can have the exact same parameters.

Adding courses to a student's list:
```csharp
s1.courseList = new List<Course>();
s1.courseList.Add(c1);
s1.courseList.Add(c3);
```

Or initialize inside the constructor so it's automatic.

---

## Access Modifiers and Encapsulation

The five access modifiers in C#:
1. `public`
2. `private`
3. `protected`
4. `internal`
5. `protected internal`

**Encapsulation** (information hiding) is one of OOP's core principles — you restrict direct access to an object's internal data and expose it only through controlled methods.

The pattern: declare fields as `private`, provide `public` getter/setter methods.

```csharp
public class Person {
    private string name;
    private byte age;

    public void SetName(string name) {
        if (!String.IsNullOrEmpty(name))
            this.name = name;
    }

    public string GetName() {
        return name;
    }
}

Person p1 = new Person();
p1.SetName("abc");
Console.WriteLine(p1.GetName());
```

This way, you can add validation logic inside the setter — you control what values actually get stored.

---

## Inheritance

**Inheritance** lets a class (child/derived/subclass) acquire the properties and behavior of another class (parent/base/superclass). The relationship is "is-a" — a Car *is a* Vehicle.

```csharp
public class PresentationObject {
    public double width;
    public double height;
}

public class Text : PresentationObject { }

public class Image : PresentationObject {
    public void Crop() {
        Console.WriteLine("Cropped image.");
    }
    public void Copy() {
        Console.WriteLine("Copied image.");
    }
    public void Paste() {
        Console.WriteLine("Pasted image.");
    }
}
```

`Text` and `Image` both inherit `width` and `height` from `PresentationObject` without redefining them.

OOP's three main characteristics:
1. **Encapsulation** — hide internal data, expose via methods
2. **Inheritance** — reuse and extend existing classes
3. **Polymorphism** — same interface, different behavior

---

## Unity Integration

### How C# Connects to Unity

Unity scripts inherit from `MonoBehaviour`. The two core methods are:

- **`Start()`** — runs once when the object is first activated. Use it for initialization: setting position, material color (takes 4 arguments: R, G, B, transparency), and scale. `Vector3.one` is shorthand for `(1, 1, 1)` — so scaling by `Vector3.one * 1.3f` scales the object to 1.3× uniformly across all axes.
- **`Update()`** — runs every frame. This is where real-time behavior lives — movement, rotation, input detection.

Instead of writing a `for` loop to do something repeatedly, you put it in `Update()` and Unity handles the frame-by-frame execution.

### Transforms and Rotation

```csharp
void Update() {
    transform.Rotate(10f * Time.deltaTime, 0.0f, 0.0f);
}
```

- `Time.deltaTime` — the time elapsed since the last frame. This keeps movement frame-rate independent.
- `10f` is the total rotation angle. The math works out to `(10 * deltaTime)` degrees per frame, so speed is consistent regardless of frame rate.
- The three arguments are rotation along X, Y, Z axes. The above only rotates on X.

### Accessing Nested Members

You can chain member access deeper than one level:
```csharp
transform.position.x       // the x component of a transform's position
line.p1.x                  // x of the first point of a line
```

### Unity's Class Hierarchy

`GameObject` is a child of Unity's `Object` class (not the same as C#'s base `Object` class). The [Unity Scripting API](https://docs.unity3d.com/Manual/ScriptingImportantClasses.html) has the full hierarchy.

**Rigidbody** component adds physics (gravity) to a GameObject.

### Plane Movement Example

Two equivalent ways to rotate a plane using the vertical input axis:

```csharp
// Option 1
transform.Rotate(Vector3.right * verticalInput * rotationSpeed * Time.deltaTime * -1);

// Option 2 (same result, different axis)
transform.Rotate(Vector3.left * verticalInput * rotationSpeed * Time.deltaTime);
```

---

*C# and Unity fundamentals — from Hello World to game object transforms.*