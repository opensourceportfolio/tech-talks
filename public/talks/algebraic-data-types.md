# Algebraic Data Types
<!-- .slide: data-auto-animate -->

#######

# Algebraic Data Types

1. What problem are we solving?
2. Unions & intersections <!-- .element: class="fragment" data-fragment-index="2" -->
3. Define ADTs <!-- .element: class="fragment" data-fragment-index="3" -->
4. Solve our problem! <!-- .element: class="fragment" data-fragment-index="4" -->

#######
<!-- .slide: class="chapter-break" data-background-color="var(--r-logo-color)" -->
# Problem

#######

# Problem

We would like to design the following function:

```typescript
function getCustomerDescription(customer: Customer): string {
  ...
}
```

Let's model this<!-- .element: class="fragment" data-fragment-index="1" -->

-------

## Problem

1. A customer must have a name.<!-- .element: class="fragment" data-fragment-index="1" -->
2. We have two types of customers right now: Guests and Hosts.<!-- .element: class="fragment" data-fragment-index="2" -->
3. A guest can be verified or not. A guest should have a payment method.<!-- .element: class="fragment" data-fragment-index="3" -->
4. A host can be a superhost, or not. A host should have an address.<!-- .element: class="fragment" data-fragment-index="4" -->

-------

## Problem

```typescript
enum Type { Guest, Host }
enum Status { Verified, Super, None }

class Customer {
  constructor(
    public type: Type,
    public status: Status,
    public name: string,
    public payment?: Payment,
    public address?: Address,
  ) {}
}
```
<!-- .element: data-id="code" -->

Any issues?<!-- .element: class="fragment" data-fragment-index="1" -->

-------

## Problem

```typescript
const customer = new Customer(
  Type.Guest,
  Status.Super,
  "John",
  null,
  null
);
```

We created a super guest with no payment information 😱<!-- .element: class="fragment" data-fragment-index="1" -->

#######
<!-- .slide: class="chapter-break" data-background-color="var(--r-logo-color)" -->
# Aside: Union & Intersection

-------

# Union

<div class="layout-row">

  ```typescript[]
  type Fruit = 'orange'
  type Veggie = 'tomato'

  type VeganFood = Fruit | Veggie
  ```
  <!-- .element: data-id="code" -->

  <div class="r-stack">

  ```typescript
  const veganDish: VeganFood = ???
  // What can go here?
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="2" -->

  ```typescript
  const veganDish: VeganFood = 'orange';
  const anotherVeganDish: VeganFood = 'tomato';
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="3" -->

  </div>

</div>

-------

# Union

<div class="layout-row">

  ```typescript
  type Cat = {
    name: string,
    litterLocation: string,
  }

  type Dog = {
    name: string,
    walkTime: Date,
  }

  type Pet = Cat | Dog
  ```
  <!-- .element: data-id="code" -->

   <div class="r-stack">

  ```typescript
  const pet: Pet = ??? // What can go here?
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="2" -->

  ```typescript
  const cat: Pet = { 
    name: 'Lilo', 
    litterLocation: 'basement' 
  }

  const dog: Pet = { 
    name: 'Primo', 
    walkTime: Date.now(), 
  }
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="3" -->

  </div>

</div>

#######

# Intersections

<div class="layout-row">

  ```typescript
  type DeliciousFood = 'chocolate' | 'berries' | 'beef'

  type HealthyFood = 'salad' | 'berries' | 'olives'

  type GoodFood = DeliciousFood & HealthyFood
  ```

  <div class="r-stack">

  ```typescript
  const goodFood: GoodFood = ???
  // What can go here?
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="1" -->

  ```typescript
  const goodFood: GoodFood = 'berries'
  ```
  <!-- .element: class="fragment" data-fragment-index="2" -->

  </div>

</div>

  It's the overlap between the two types
  <!-- .element: class="fragment" data-fragment-index="3" -->

#######

# Intersections

<div class="layout-row">

  ```typescript
  type Cat = {
    name: string,
    litterLocation: string,
  }

  type Dog = {
    name: string,
    walkTime: Date,
  }

  type Pet = Cat & Dog
  ```
  <!-- .element: data-id="code" -->

  <div class="r-stack">

  ```typescript
  const pet: Pet = ??? 
  // What can go here?
  ```
  <!-- .element: class="fragment fade-in-then-out" data-fragment-index="1" -->

  <div>

  ```typescript
  const firstPet: Pet = {
    name: "Stitch",
  }
  ```
  <!-- .element: class="fragment semi-fade-out shrink" data-fragment-index="4" -->

  ```typescript
  const secondPet: Pet = {
    name: "Stitch",
    litterLocation: "basement",
    walkTime: Date.now(),
  }
  ```  
  <!-- .element: class="fragment grow" data-fragment-index="4" -->

  </div>
  <!-- .element: class="fragment code-block" data-fragment-index="2" -->

  </div>

</div>

Is it firstPet or secondPet?
<!-- .element: class="fragment" data-fragment-index="3" -->

-------

# Intersections

<div class="layout-row">

![intersection-1](/images/intersection_1.svg)
<!-- .element: class="fragment" data-fragment-index="1" -->

![intersection-1](/images/intersection_2.svg)
<!-- .element: class="fragment" data-fragment-index="2" -->

</div>

#######
<!-- .slide: class="chapter-break" data-background-color="var(--r-logo-color)" -->
# Finally, ADTs

#######

# Definition

#######

# Definition

> A kind of type formed by combining other types.

It's likely you use these all the time.<!-- .element: class="fragment" data-fragment-index="1" -->

#######

# Definition

There are two kinds: <!-- .element: class="fragment" data-fragment-index="1" -->

1. Product type <!-- .element: class="fragment" data-fragment-index="2" -->
2. Sum type <!-- .element: class="fragment" data-fragment-index="3" -->

#######

# Product Type

-------

# Product Type

Product types are formed by creating a structure with multiple values.

Does that sound familiar? <!-- .element: class="fragment" data-fragment-index="1" -->

Intersection anyone? <!-- .element: class="fragment" data-fragment-index="2" -->

-------

# Product Type

```typescript
type ProductFirst = { first: boolean }
type ProductSecond = { second: boolean }
```

```typescript
type Product = ProductFirst & ProductSecond
```

That's it.<!-- .element: class="fragment" data-fragment-index="1" -->

-------

## Why is it called a product type?

How many unique possible values of `Product` can you have?

```typescript
type ProductFirst = { first: boolean }
type ProductSecond = { second: boolean }

type Product = ProductFirst & ProductSecond
```
<!-- .element: class="fragment" data-fragment-index="1" data-id="code" -->

Any guesses? <!-- .element: class="fragment" data-fragment-index="2" -->

## 4 <!-- .element: class="fragment" data-fragment-index="3" -->

-------

## Why is it called a product type?

```typescript
type Product = ProductFirst & ProductSecond
```
<!-- .element: data-id="code" -->

We get our answer by multiplying <!-- .element: class="fragment" data-fragment-index="1" -->
`$$ |ProductFirst| \cdot |ProductSecond| $$`<!-- .element: class="fragment" data-fragment-index="2" -->
`$$ 2 \cdot 2 $$`<!-- .element: class="fragment" data-fragment-index="3" -->

## 4 <!-- .element: class="fragment" data-fragment-index="4" -->

#######

# Sum Type

-------

## Sum Type

```typescript
type Malus = "Apple";
type Citrus = "Orange" | "Mandarin";

type Sum = Malus | Citrus 
```

How many unique possible values of `Sum` can you have?
<!-- .element: class="fragment" data-fragment-index="1" data-id="code" -->

Any guesses? <!-- .element: class="fragment" data-fragment-index="2" -->

## 3 <!-- .element: class="fragment" data-fragment-index="3" -->

You just add them up. <!-- .element: class="fragment" data-fragment-index="4" -->

#######

## Algebraic Data Types

> ADTs are all about combining sum and product types using unions and intersections to model our data.

#######
<!-- .slide: class="chapter-break" data-background-color="var(--r-logo-color)" -->
# Back to the problem

-------

## Back to the problem

```typescript
enum Type { Guest, Host }
enum Status { Verified, Super, None }

class Customer {
  constructor(
    public type: Type,
    public status: Status,
    public name: string,
    public payment?: Payment,
    public address?: Address,
  ) {}
}
```

Let's use ADTs to improve this implementation.
<!-- .element: class="fragment" data-fragment-index="1" -->

-------

## Back to the problem

Let's create a union of Guest and Host

```typescript
type Guest = {
  type: Type.Guest,
  status: Status.Verified | Status.None,
  name: string,
  paymentMethod: Payment,
}

type Host = {
  type: Type.Host,
  status: Status.Super | Status.None,
  name: string,
  address: Address,    
}

type Customer = Guest | Host;
```
<!-- .element: class="fragment" data-fragment-index="1" -->

We've summed two product types.
<!-- .element: class="fragment" data-fragment-index="1" -->

There is no way we can create a Super guest or a Host without an address.
<!-- .element: class="fragment" data-fragment-index="2" -->

-------

## Type refinement  

With that, we get free benefits:
<!-- .element: class="fragment" data-fragment-index="1" -->

```typescript

function getCustomerDescription(customer: Customer): string {
  if (customer.type === Type.Guest) {
    return `guest: ${customer.payment}`;
  } else if (customer.type === Type.Host) {
    return `host: ${customer.address}`;
  }

  return "impossible";
}
```
<!-- .element: class="fragment" data-fragment-index="2" -->

-------

## Pattern Match

```typescript
// Stage 1 proposal

function getCustomerDescription(customer: Customer): string {
  return match (customer) {
    when ({ type: Type.Guest, payment }): `guest: ${payment}`;
    when ({type: Type.Host, address}): `host: ${address}`;
    default: "impossible"
  };
}
```

-------

### Wait a sec

### Couldn't I just do the same with interfaces?<!-- .element: class="fragment" data-fragment-index="1" -->

-------

## OOP approach

```typescript
interface Customer {
  type: Type,
  status: Status,
}
```

```typescript
class Guest implements Customer {
  type = Type.Guest
  constructor(
    public status: GuestStatus, // limit to guest statuses
    public name: string,
    public payment: Payment) {}
}

class Host implements Customer {
  ...
}
```
<!-- .element: class="fragment" data-fragment-index="1" -->

Isn't that the same thing? Not exactly <!-- .element: class="fragment" data-fragment-index="2" -->

-------

## Type refinement with OOP

<div class="layout-row">

```typescript
interface Customer {
  type: Type,
  status: Status,
}
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```typescript
function getCustomerDescription(customer: Customer): string {
  if (customer.type === Type.Guest) {
    // What do we actually know here
  } else if (customer.type === Type.Host) {
    // What do we actually know here
  }

  return "impossible"; // Are we sure?
}
```
<!-- .element: class="fragment" data-fragment-index="2" -->

</div>

Nothing! and that's a feature.
<!-- .element: class="fragment" data-fragment-index="3" -->

There is no control over who implements our interface.
<!-- .element: class="fragment" data-fragment-index="4" -->

-------

## Type refinement with ADTs

```typescript

function getCustomerDescription(customer: Customer): string {
  if (customer.type === Type.Guest) {
    return `guest: ${customer.payment}`; // we know for sure it's a guest with payment
  } else if (customer.type === Type.Host) {
    return `host: ${customer.address}`; // we know for sure it's a host with an address
  }

  return "impossible"; // should never get here. customer is of type `never`.
}
```

-------

## Back to the problem

But We can still do better.
<!-- .element: class="fragment" data-fragment-index="1" -->

Let's use the algebra in algebraic.
<!-- .element: class="fragment" data-fragment-index="2" -->

#######

## Back to the problem

<div class="layout-row">

```typescript
type Guest = {
  type: Type.Guest,
  status: Status.Verified | Status.None,
  name: string, // this is common
  paymentMethod: Payment,
}

type Host = {
  type: Type.Host,
  status: Status.Super | Status.None,
  name: string, // this is common
  address: Address,    
}
```
<!-- .element: data-id="code" -->

</div>

#######

## Back to the problem

<div class="layout-row">

```typescript
type Guest = {
  type: Type.Guest,
  status: Status.Verified | Status.None,
  paymentMethod: Payment,
}

type Host = {
  type: Type.Host,
  status: Status.Super | Status.None,
  address: Address,    
}
```
<!-- .element: data-id="code" -->

</div>

#######

## Back to the problem

<div class="layout-row">

  ```typescript
  type Guest = {
    type: Type.Guest,
    status: Status.Verified | Status.None,
    paymentMethod: Payment,
  }

  type Host = {
    type: Type.Host,
    status: Status.Super | Status.None,
    address: Address,    
  }
  ```
  <!-- .element: data-id="code" -->

  <div>

  ```typescript
  type CustomerBase = { name: string }
  ```
  <!-- .element: data-id="code2" -->

  ```typescript
  type Customer = CustomerBase & (Guest | Host)
  ```
  <!-- .element: class="fragment" data-fragment-index="1" -->

  </div>

</div>

Just like math!<!-- .element: class="fragment" data-fragment-index="2" -->

#######

# One more thing
<!-- .slide: data-auto-animate -->

#######

## Type refinement

Imagine we extend our `Customer` to include `ExperienceHost` like so:
<!-- .element: class="fragment" data-fragment-index="1" -->

```typescript
type Customer = CustomerBase & (Guest | Host | ExperienceHost)
```
<!-- .element: class="fragment" data-fragment-index="2" -->

What do we get when we call
<!-- .element: class="fragment" data-fragment-index="3" -->
```typescript
getCustomerDescription(experienceHost)
```
<!-- .element: class="fragment" data-fragment-index="3" -->

We get `impossible`.
<!-- .element: class="fragment" data-fragment-index="4" -->

Wouldn't it be nice if the compiler warned us about this?
<!-- .element: class="fragment" data-fragment-index="5" -->

-------

## Type refinement

Let's introduce this absurd function:

```typescript
const absurd = <A,>(x: never): A => { throw 'impossible' };
```
<!-- .element: class="fragment" data-fragment-index="1" -->

Doesn't look very useful but ...<!-- .element: class="fragment" data-fragment-index="2" -->

-------

## Type refinement

```typescript
function getCustomerDescription(customer: Customer): string {
  if (customer.type === Type.Guest) {
    // What do we actually know here
    return 'guest';
  } else if (customer.type === Type.Host) {
    // What do we actually know here
    return 'host';
  }

  return absurd(customer);
}
```

Works great prior to ExperienceHost declaration
<!-- .element: class="fragment" data-fragment-index="1" -->

But once we extend Customer we will get `Argument of type 'CustomerBase & ExperienceHost' is not assignable to parameter of type 'never'`
<!-- .element: class="fragment" data-fragment-index="2" -->

-------

## [demo](https://www.typescriptlang.org/play?#code/KYOwrgtgBAKgngB2FA3lA4mYBnALgGigAkB7PQgUQA8kAnAS1AGNkBfAWAChRIoBlXAENcYbKigA1YAwBmjACaE+YOoQByJEGy5dciZAEF582jjEBeKHgYgA5gG5d+qAAVBcCKFxRL1+ncdOJyQMLDwfVC4oKD0kAC5YfQA6TBwCKKshEWwEgWFRJKlZBSgAH34sgo0tfAyEd08QXABZYFwACxJ5BLcPL1rODiDOWORScMsUDNGE+CQk8fTOaLx8nIq1pOU6Mo3spOrgAejBY1NsdaMTM0JoqC4h4ORqOkYQFkWIqeWY-Vnkl7SN4sY5QYA0IHMYAJPx2AaPEbOADColwJE8tAAQoJsMhJlAQIJPDDcDZbFAEaMoCi8OjpBEaWiMdjcVAAGRQAAUqXC5U+5UBDChiwAlDpOExNOFBAAjbBgWjyCIAHgM+AAfJyqAktAA3aQihIGHzq1AdWgkADuUAA5PQIAgyNh6DKADbAG2sQJcGRgd64eiaKC2NqMum0AAiOCYDAQAc0nKYqPDCTDGMNmTJkR+9BkXKTtIxSSp5lLiXmPNwIuzdygAHo61AAOrtYRQeQkKCW5CCJgiQSu11wKAAaxAVqg7WkwAy0VMIloIFttjCuBtgWirDBrtZufzyaLJbLc2ACzIVZrdwbzdb3g7XZ7fbAA6Ho-H1qnplnUHnCqXNs6PB1wyBE5zaP8oFleVFUTA8DUCVggA)

```demo
enum Type { Guest, Host, Experience }
enum Status { Verified, Super, None }

type Address = string;
type Payment = string;

type Guest = {
  type: Type.Guest,
  status: Status.Verified | Status.None,
  paymentMethod: Payment,
}

type Host = {
  type: Type.Host,
  status: Status.Super | Status.None,
  address: Address,    
}

type ExperienceHost = {
  type: Type.Experience,
  experience: string,
}

type CustomerBase = { name: string }

type Customer = CustomerBase & (Guest | Host | ExperienceHost)

const absurd = <A,>(x: never): A => {throw 'impossible'};

function getCustomerDescription(customer: Customer): string {
  if (customer.type === Type.Guest) {
    // What do we actually know here
    return 'guest';
  } else if (customer.type === Type.Host) {
    // What do we actually know here
    return 'host';
  }

  return absurd(customer);
}
```

#######

# Thank you
<!-- .slide: data-auto-animate -->
