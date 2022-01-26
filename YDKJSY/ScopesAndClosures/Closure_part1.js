let isPrime;
{
    let primes = {};

    // isPrime closes over 'primes' object
    isPrime = function isPrime(v) {

        if (typeof primes[v] === 'boolean') {
            return primes[v];
        }

        if(v<=3) {
            return v>1;
        }
        if(v%2==0||v%3==0) {
            return false;
        }
        var vSqrt=Math.sqrt(v);
        for(let i=5; i<=vSqrt; i+=6) {
            if(v%i==0||v%(i+2)==0) {
                primes[v] = false;
                return false;
            }
        }
        primes[v] = true;
        return true;
    }
}

// scope ended but 'primes' variable is closed over by isPrime function
console.log(isPrime(4327));



let factorize;
{
    let factors = {}

    // factorize closes over 'factors' object
    factorize = function factorize(v) {
        if (factors[v]) {
            return factors[v];
        }
        if(!isPrime(v)) {
            let i=Math.floor(Math.sqrt(v));
            while(v%i!=0) {i--;}
            factors[v] = [...factorize(i),...factorize(v/i)];
        } else {
            factors[v] = [v];
        }

        return factors[v];
    }
}

// scope ended but 'factors' variable is closed over by factorize function
console.log(factorize(134328797345));