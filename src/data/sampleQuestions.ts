export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Question {
  id: string;
  title: string;
  company: string;
  companyType: "product" | "service" | "exam";
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  salaryPackage: string;
  acceptanceRate: string;
  frequency: "High" | "Very High" | "Medium";
  description: string;
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  };
  sampleSolution: {
    language: string;
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
  };
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "two-sum",
    title: "Two Sum Target Indices",
    company: "Google",
    companyType: "product",
    category: "Arrays & Hash Maps",
    difficulty: "Easy",
    salaryPackage: "₹25–45 LPA",
    acceptanceRate: "49.8%",
    frequency: "Very High",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        expectedOutput: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        expectedOutput: "[1, 2]",
        explanation: "nums[1] + nums[2] == 6, return [1, 2].",
      },
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(twoSum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) return {seen[complement], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def twoSum(nums, target):
    lookup = {}
    for index, value in enumerate(nums):
        diff = target - value
        if diff in lookup:
            return [lookup[diff], index]
        lookup[value] = index
    return []`,
      timeComplexity: "O(n) linear scan",
      spaceComplexity: "O(n) hash table",
      explanation:
        "By caching visited elements in a hash map, we achieve single-pass lookups with O(1) average lookup time.",
    },
  },
  {
    id: "tcs-valid-parentheses",
    title: "Balanced Parentheses Checker",
    company: "TCS",
    companyType: "exam",
    category: "Strings & Stacks",
    difficulty: "Easy",
    salaryPackage: "₹3.5–9 LPA (TCS NQT)",
    acceptanceRate: "62.4%",
    frequency: "Very High",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    testCases: [
      {
        input: 's = "()[]{}"',
        expectedOutput: "true",
        explanation: "All brackets open and close properly in sequence.",
      },
      {
        input: 's = "(]"',
        expectedOutput: "false",
        explanation: "Mismatched closing bracket type.",
      },
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

print(isValid("()[]{}"))`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}"));`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    },
    sampleSolution: {
      language: "JavaScript",
      code: `function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  for (let char of s) {
    if (pairs[char]) {
      stack.push(pairs[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}`,
      timeComplexity: "O(n) where n is length of string",
      spaceComplexity: "O(n) worst-case stack depth",
      explanation:
        "Push expected closing brackets onto stack and pop when closing bracket is met.",
    },
  },
  {
    id: "amazon-lru-cache",
    title: "LRU Cache Implementation",
    company: "Amazon",
    companyType: "product",
    category: "Design & Linked Lists",
    difficulty: "Medium",
    salaryPackage: "₹20–42 LPA",
    acceptanceRate: "41.5%",
    frequency: "Very High",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with get(key) and put(key, value) operations running in O(1) average time complexity.",
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
    testCases: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]',
        expectedOutput: "[null, null, null, 1, null, -1]",
        explanation: "Key 2 was evicted because key 1 was accessed via get.",
      },
    ],
    starterCode: {
      python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end to mark as recently used
        val = self.cache.pop(key)
        self.cache[key] = val
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            # Evict first (oldest) item
            del self.cache[next(iter(self.cache))]
        self.cache[key] = value

lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
print(lru.get(1))`,
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}`,
      java: `import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
      cpp: `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!m.count(key)) return -1;
        l.splice(l.begin(), l, m[key]);
        return m[key]->second;
    }
    void put(int key, int value) {
        if (m.count(key)) {
            l.splice(l.begin(), l, m[key]);
            m[key]->second = value;
            return;
        }
        if (l.size() == cap) {
            m.erase(l.back().first);
            l.pop_back();
        }
        l.push_front({key, value});
        m[key] = l.begin();
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `from collections import OrderedDict

class LRUCache(OrderedDict):
    def __init__(self, capacity: int):
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self:
            return -1
        self.move_to_end(key)
        return self[key]

    def put(self, key: int, value: int) -> None:
        if key in self:
            self.move_to_end(key)
        self[key] = value
        if len(self) > self.capacity:
            self.popitem(last=False)`,
      timeComplexity: "O(1) for both get and put",
      spaceComplexity: "O(capacity)",
      explanation:
        "OrderedDict preserves insertion order while allowing O(1) eviction and move_to_end operations.",
    },
  },
  {
    id: "infosys-dse-coin-change",
    title: "Minimum Coin Change",
    company: "Infosys",
    companyType: "exam",
    category: "Dynamic Programming",
    difficulty: "Medium",
    salaryPackage: "₹6.5–9.5 LPA (InfyTQ DSE)",
    acceptanceRate: "44.1%",
    frequency: "High",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.",
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    testCases: [
      {
        input: "coins = [1, 2, 5], amount = 11",
        expectedOutput: "3",
        explanation: "11 = 5 + 5 + 1 (3 coins total)",
      },
      {
        input: "coins = [2], amount = 3",
        expectedOutput: "-1",
        explanation: "Cannot make amount 3 with only coin 2.",
      },
    ],
    starterCode: {
      python: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

print(coinChange([1, 2, 5], 11))`,
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let x = coin; x <= amount; x++) {
      dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11));`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int c : coins) {
            for (int i = c; i <= amount; i++) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      timeComplexity: "O(amount * len(coins))",
      spaceComplexity: "O(amount)",
      explanation:
        "Bottom-up 1D DP table where each state represents the minimal coins needed to form sub-amount i.",
    },
  },
  {
    id: "zoho-string-compression",
    title: "In-Place String Compression",
    company: "Zoho",
    companyType: "product",
    category: "Two Pointers & Arrays",
    difficulty: "Easy",
    salaryPackage: "₹6–12 LPA",
    acceptanceRate: "54.8%",
    frequency: "Very High",
    description:
      "Given an array of characters chars, compress it using the following algorithm: Begin with an empty string s. For each group of consecutive repeating characters in chars, append the character followed by the group's length. Return the new length of the array.",
    constraints: [
      "1 <= chars.length <= 2000",
      "chars[i] is a lowercase English letter, uppercase letter, digit, or symbol.",
    ],
    testCases: [
      {
        input: 'chars = ["a","a","b","b","c","c","c"]',
        expectedOutput: '6, chars becomes ["a","2","b","2","c","3"]',
        explanation: 'Group "aa" compressed to "a2", "bb" to "b2", "ccc" to "c3".',
      },
      {
        input: 'chars = ["a"]',
        expectedOutput: '1, chars becomes ["a"]',
        explanation: 'Single character is not followed by a count.',
      },
    ],
    starterCode: {
      python: `def compress(chars):
    write = 0
    read = 0
    n = len(chars)
    while read < n:
        char = chars[read]
        count = 0
        while read < n and chars[read] == char:
            read += 1
            count += 1
        chars[write] = char
        write += 1
        if count > 1:
            for digit in str(count):
                chars[write] = digit
                write += 1
    return write

chars = ["a","a","b","b","c","c","c"]
print(compress(chars))`,
      javascript: `function compress(chars) {
  let write = 0;
  let read = 0;
  while (read < chars.length) {
    const char = chars[read];
    let count = 0;
    while (read < chars.length && chars[read] === char) {
      read++;
      count++;
    }
    chars[write++] = char;
    if (count > 1) {
      for (const d of String(count)) {
        chars[write++] = d;
      }
    }
  }
  return write;
}`,
      java: `class Solution {
    public int compress(char[] chars) {
        int write = 0, read = 0;
        while (read < chars.length) {
            char c = chars[read];
            int count = 0;
            while (read < chars.length && chars[read] == c) {
                read++;
                count++;
            }
            chars[write++] = c;
            if (count > 1) {
                for (char d : Integer.toString(count).toCharArray()) {
                    chars[write++] = d;
                }
            }
        }
        return write;
    }
}`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int compress(vector<char>& chars) {
        int write = 0, read = 0, n = chars.size();
        while (read < n) {
            char c = chars[read];
            int count = 0;
            while (read < n && chars[read] == c) {
                read++; count++;
            }
            chars[write++] = c;
            if (count > 1) {
                for (char d : to_string(count)) chars[write++] = d;
            }
        }
        return write;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def compress(chars):
    write = read = 0
    while read < len(chars):
        char = chars[read]
        count = 0
        while read < len(chars) and chars[read] == char:
            read += 1
            count += 1
        chars[write] = char
        write += 1
        if count > 1:
            for c in str(count):
                chars[write] = c
                write += 1
    return write`,
      timeComplexity: "O(n) single pass",
      spaceComplexity: "O(1) in-place modification",
      explanation:
        "Two-pointer approach (read and write) modifying the array in-place without extra buffer allocations.",
    },
  },
  {
    id: "microsoft-merge-intervals",
    title: "Merge Overlapping Intervals",
    company: "Microsoft",
    companyType: "product",
    category: "Sorting & Greedy",
    difficulty: "Medium",
    salaryPackage: "₹22–45 LPA",
    acceptanceRate: "47.3%",
    frequency: "High",
    description:
      "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
    testCases: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        expectedOutput: "[[1,6],[8,10],[15,18]]",
        explanation: "Intervals [1,3] and [2,6] overlap, merging into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        expectedOutput: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    starterCode: {
      python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged

print(merge([[1,3],[2,6],[8,10],[15,18]]))`,
      javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const curr of intervals) {
    if (!merged.length || merged[merged.length - 1][1] < curr[0]) {
      merged.push(curr);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], curr[1]);
    }
  }
  return merged;
}`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (auto& iv : intervals) {
            if (merged.empty() || merged.back()[1] < iv[0]) merged.push_back(iv);
            else merged.back()[1] = max(merged.back()[1], iv[1]);
        }
        return merged;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    res = []
    for start, end in intervals:
        if not res or res[-1][1] < start:
            res.append([start, end])
        else:
            res[-1][1] = max(res[-1][1], end)
    return res`,
      timeComplexity: "O(n log n) sorting",
      spaceComplexity: "O(n) for merged output list",
      explanation:
        "Sort intervals by start time; any overlapping interval will then be contiguous to the preceding one.",
    },
  },
  {
    id: "wipro-prime-seive",
    title: "Count Primes in Range",
    company: "Wipro",
    companyType: "service",
    category: "Math & Number Theory",
    difficulty: "Easy",
    salaryPackage: "₹3.5–6.5 LPA (Wipro NLTH)",
    acceptanceRate: "68.2%",
    frequency: "High",
    description:
      "Given an integer n, return the number of prime numbers that are strictly less than n. Implement an optimized Sieve of Eratosthenes approach.",
    constraints: ["0 <= n <= 5 * 10^6"],
    testCases: [
      {
        input: "n = 10",
        expectedOutput: "4",
        explanation: "There are 4 primes less than 10: 2, 3, 5, 7.",
      },
      {
        input: "n = 0",
        expectedOutput: "0",
        explanation: "No primes strictly less than 0.",
      },
    ],
    starterCode: {
      python: `def countPrimes(n: int) -> int:
    if n <= 2:
        return 0
    isPrime = [True] * n
    isPrime[0] = isPrime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if isPrime[i]:
            for j in range(i * i, n, i):
                isPrime[j] = False
    return sum(isPrime)

print(countPrimes(10))`,
      javascript: `function countPrimes(n) {
  if (n <= 2) return 0;
  const isPrime = new Uint8Array(n).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) if (isPrime[i]) count++;
  return count;
}`,
      java: `class Solution {
    public int countPrimes(int n) {
        if (n <= 2) return 0;
        boolean[] isPrime = new boolean[n];
        for (int i = 2; i < n; i++) isPrime[i] = true;
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) isPrime[j] = false;
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) if (isPrime[i]) count++;
        return count;
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int countPrimes(int n) {
        if (n <= 2) return 0;
        vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) isPrime[j] = false;
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) if (isPrime[i]) count++;
        return count;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def countPrimes(n):
    if n < 3:
        return 0
    primes = [True] * n
    primes[0] = primes[1] = False
    for i in range(2, int(n**0.5) + 1):
        if primes[i]:
            primes[i*i:n:i] = [False] * len(primes[i*i:n:i])
    return sum(primes)`,
      timeComplexity: "O(n log log n)",
      spaceComplexity: "O(n) boolean array",
      explanation:
        "Sieve of Eratosthenes marks non-primes starting from i*i up to n in steps of i.",
    },
  },
  {
    id: "accenture-reverse-linked-list",
    title: "Reverse a Singly Linked List",
    company: "Accenture",
    companyType: "service",
    category: "Linked Lists",
    difficulty: "Easy",
    salaryPackage: "₹4.5–8.5 LPA (Accenture ASE)",
    acceptanceRate: "73.1%",
    frequency: "Very High",
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list head in O(n) time and O(1) extra space.",
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    testCases: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        expectedOutput: "[5, 4, 3, 2, 1]",
        explanation: "Pointers reversed from 1->2->3->4->5 to 5->4->3->2->1.",
      },
    ],
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};`,
    },
    sampleSolution: {
      language: "JavaScript",
      code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      timeComplexity: "O(n) where n is node count",
      spaceComplexity: "O(1) in-place pointer reversal",
      explanation:
        "Iterative three-pointer approach swapping pointers without recursion overhead.",
    },
  },
  {
    id: "flipkart-longest-substring",
    title: "Longest Substring Without Repeating",
    company: "Flipkart",
    companyType: "product",
    category: "Sliding Window & Strings",
    difficulty: "Medium",
    salaryPackage: "₹18–32 LPA",
    acceptanceRate: "35.2%",
    frequency: "High",
    description:
      "Given a string s, find the length of the longest substring without duplicate characters.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    testCases: [
      {
        input: 's = "abcabcbb"',
        expectedOutput: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        expectedOutput: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

print(lengthOfLongestSubstring("abcabcbb"))`,
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (map.has(ch) && map.get(ch) >= left) {
      left = map.get(ch) + 1;
    }
    map.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      java: `import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(256, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (lastIndex[(unsigned char)s[right]] >= left) {
                left = lastIndex[(unsigned char)s[right]] + 1;
            }
            lastIndex[(unsigned char)s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def lengthOfLongestSubstring(s):
    seen = {}
    l = 0
    res = 0
    for r, c in enumerate(s):
        if c in seen and seen[c] >= l:
            l = seen[c] + 1
        seen[c] = r
        res = max(res, r - l + 1)
    return res`,
      timeComplexity: "O(n) sliding window",
      spaceComplexity: "O(min(m, n)) character hashmap",
      explanation:
        "Sliding window [left, right] jumps left pointer immediately past the previous instance of any duplicate character.",
    },
  },
  {
    id: "google-trapping-rain-water",
    title: "Trapping Rain Water",
    company: "Google",
    companyType: "product",
    category: "Two Pointers & Arrays",
    difficulty: "Hard",
    salaryPackage: "₹25–45 LPA",
    acceptanceRate: "59.1%",
    frequency: "Very High",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    testCases: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        expectedOutput: "6",
        explanation: "6 units of rain water are trapped between elevation bars.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        expectedOutput: "9",
        explanation: "9 units of rain water are trapped in the reservoir.",
      },
    ],
    starterCode: {
      python: `def trap(height):
    if not height: return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
      javascript: `function trap(height) {
  let l = 0, r = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= leftMax) leftMax = height[l];
      else water += leftMax - height[l];
      l++;
    } else {
      if (height[r] >= rightMax) rightMax = height[r];
      else water += rightMax - height[r];
      r--;
    }
  }
  return water;
}`,
      java: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def trap(height):
    l, r = 0, len(height) - 1
    left_max = right_max = water = 0
    while l < r:
        if height[l] < height[r]:
            left_max = max(left_max, height[l])
            water += left_max - height[l]
            l += 1
        else:
            right_max = max(right_max, height[r])
            water += right_max - height[r]
            r -= 1
    return water`,
      timeComplexity: "O(n) linear time",
      spaceComplexity: "O(1) constant pointers",
      explanation:
        "Two-pointer scan maintains current maximum heights from left and right boundaries without additional memory.",
    },
  },
  {
    id: "amazon-k-frequent",
    title: "Top K Frequent Elements",
    company: "Amazon",
    companyType: "product",
    category: "Heap & Hash Maps",
    difficulty: "Medium",
    salaryPackage: "₹20–42 LPA",
    acceptanceRate: "63.3%",
    frequency: "Very High",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order with better than O(n log n) time complexity.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique.",
    ],
    testCases: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        expectedOutput: "[1, 2]",
        explanation: "1 appears 3 times, 2 appears 2 times, top 2 are [1, 2].",
      },
      {
        input: "nums = [1], k = 1",
        expectedOutput: "[1]",
        explanation: "Single element occurs most frequently.",
      },
    ],
    starterCode: {
      python: `from collections import Counter
import heapq

def topKFrequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

print(topKFrequent([1,1,1,2,2,3], 2))`,
      javascript: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  return Array.from(count.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(e => e[0]);
}`,
      java: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> map.get(a) - map.get(b));
        for (int key : map.keySet()) {
            pq.add(key);
            if (pq.size() > k) pq.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = pq.poll();
        return res;
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        for (auto& p : count) {
            pq.push({p.second, p.first});
            if (pq.size() > k) pq.pop();
        }
        vector<int> res;
        while (!pq.empty()) {
            res.push_back(pq.top().second);
            pq.pop();
        }
        return res;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def topKFrequent(nums, k):
    count = {}
    for n in nums:
        count[n] = 1 + count.get(n, 0)
    buckets = [[] for _ in range(len(nums) + 1)]
    for n, c in count.items():
        buckets[c].append(n)
    res = []
    for i in range(len(buckets) - 1, 0, -1):
        for n in buckets[i]:
            res.append(n)
            if len(res) == k:
                return res`,
      timeComplexity: "O(n) bucket sort",
      spaceComplexity: "O(n) frequency buckets",
      explanation:
        "Bucket sort where index corresponds to frequency allows extraction of top-k in linear time.",
    },
  },
  {
    id: "tcs-matrix-traversal",
    title: "Matrix Spiral Traversal",
    company: "TCS",
    companyType: "exam",
    category: "Matrix & Simulation",
    difficulty: "Medium",
    salaryPackage: "₹3.5–9 LPA (TCS NQT Digital)",
    acceptanceRate: "52.7%",
    frequency: "High",
    description:
      "Given an m x n matrix, return all elements of the matrix in spiral order. Frequently featured in TCS NQT Digital and Ninja advanced coding rounds.",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100",
    ],
    testCases: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        expectedOutput: "[1,2,3,6,9,8,7,4,5]",
        explanation: "Clockwise spiral path traverses all cells uniquely.",
      },
    ],
    starterCode: {
      python: `def spiralOrder(matrix):
    res = []
    if not matrix: return res
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            res.append(matrix[top][col])
        top += 1
        for row in range(top, bottom + 1):
            res.append(matrix[row][right])
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                res.append(matrix[bottom][col])
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                res.append(matrix[row][left])
            left += 1
    return res

print(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))`,
      javascript: `function spiralOrder(matrix) {
  const res = [];
  if (!matrix.length) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
      java: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.add(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty()) return res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.push_back(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.push_back(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.push_back(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.push_back(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def spiralOrder(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res`,
      timeComplexity: "O(m * n) visits each cell once",
      spaceComplexity: "O(1) excluding output buffer",
      explanation:
        "Boundary shrinkage technique tracking top, bottom, left, right limits clockwise.",
    },
  },
  {
    id: "microsoft-search-rotated-array",
    title: "Search in Rotated Sorted Array",
    company: "Microsoft",
    companyType: "product",
    category: "Binary Search & Arrays",
    difficulty: "Medium",
    salaryPackage: "₹22–45 LPA",
    acceptanceRate: "41.5%",
    frequency: "Very High",
    description:
      "There is an integer array nums sorted in ascending order with distinct values. Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must achieve O(log n) runtime complexity.",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique",
      "nums is guaranteed to be rotated at some pivot",
      "-10^4 <= target <= 10^4",
    ],
    testCases: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        expectedOutput: "4",
        explanation: "0 is located at index 4 in nums.",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        expectedOutput: "-1",
        explanation: "3 is not present in the rotated array, so -1 is returned.",
      },
    ],
    starterCode: {
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else: # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

# Test
print(search([4, 5, 6, 7, 0, 1, 2], 0))`,
      javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        # Check if left half is monotonically increasing
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else: # Right half must be sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
      timeComplexity: "O(log n) binary search on partitioned halves",
      spaceComplexity: "O(1) constant auxiliary memory",
      explanation:
        "Determine which half of the rotated array is strictly ordered. If target falls within that sorted segment, narrow search to that half; otherwise search the opposing half.",
    },
  },
  {
    id: "infosys-longest-palindrome",
    title: "Longest Palindromic Substring",
    company: "Infosys",
    companyType: "exam",
    category: "Strings & Dynamic Programming",
    difficulty: "Medium",
    salaryPackage: "₹6.5–9.5 LPA (InfyTQ / DSE)",
    acceptanceRate: "34.2%",
    frequency: "High",
    description:
      "Given a string s, return the longest palindromic substring in s. A cornerstone question frequently featured in Infosys Digital Specialist Engineer (DSE) and InfyTQ programming assessments.",
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of only lowercase and uppercase English letters and digits.",
    ],
    testCases: [
      {
        input: 's = "babad"',
        expectedOutput: '"bab"',
        explanation: '"aba" is also a valid solution for this test case.',
      },
      {
        input: 's = "cbbd"',
        expectedOutput: '"bb"',
        explanation: 'The longest palindromic substring is "bb".',
      },
    ],
    starterCode: {
      python: `def longestPalindrome(s):
    if not s: return ""
    start, max_len = 0, 1
    def expand(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            cur_len = right - left + 1
            if cur_len > max_len:
                start = left
                max_len = cur_len
            left -= 1
            right += 1
    for i in range(len(s)):
        expand(i, i)     # Odd length
        expand(i, i + 1) # Even length
    return s[start:start + max_len]

# Test
print(longestPalindrome("babad"))`,
      javascript: `function longestPalindrome(s) {
  if (!s || s.length < 2) return s;
  let start = 0, maxLen = 1;
  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const len = right - left + 1;
      if (len > maxLen) {
        start = left;
        maxLen = len;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad"));`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 2) return s;
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    private int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`,
      cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        if (s.size() < 2) return s;
        int start = 0, maxLen = 1;
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < s.size() && s[l] == s[r]) {
                if (r - l + 1 > maxLen) {
                    start = l;
                    maxLen = r - l + 1;
                }
                l--; r++;
            }
        };
        for (int i = 0; i < s.size(); i++) {
            expand(i, i);
            expand(i, i + 1);
        }
        return s.substr(start, maxLen);
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def longestPalindrome(s):
    if len(s) < 2:
        return s
    start, max_len = 0, 1
    def expand(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            if right - left + 1 > max_len:
                start = left
                max_len = right - left + 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)     # Centered at single character
        expand(i, i + 1) # Centered between two characters
    return s[start:start + max_len]`,
      timeComplexity: "O(n^2) expanding at 2n - 1 centers",
      spaceComplexity: "O(1) auxiliary space without DP table",
      explanation:
        "Expand outwards from each possible palindrome center. There are 2n - 1 centers (n single characters and n - 1 adjacent character spaces).",
    },
  },
  {
    id: "google-binary-tree-max-path",
    title: "Binary Tree Maximum Path Sum",
    company: "Google",
    companyType: "product",
    category: "Trees & Recursion",
    difficulty: "Hard",
    salaryPackage: "₹25–45 LPA",
    acceptanceRate: "39.8%",
    frequency: "High",
    description:
      "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can appear at most once. The path sum is the sum of node values. Return the maximum path sum of any non-empty path. A quintessential Google SDE on-site tree question.",
    constraints: [
      "The number of nodes in the tree is in the range [1, 3 * 10^4]",
      "-1000 <= Node.val <= 1000",
    ],
    testCases: [
      {
        input: "root = [1, 2, 3]",
        expectedOutput: "6",
        explanation: "The optimal path is 2 -> 1 -> 3 with path sum 2 + 1 + 3 = 6.",
      },
      {
        input: "root = [-10, 9, 20, null, null, 15, 7]",
        expectedOutput: "42",
        explanation: "The optimal path is 15 -> 20 -> 7 with path sum 15 + 20 + 7 = 42.",
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root):
    max_sum = float('-inf')
    def gain(node):
        nonlocal max_sum
        if not node: return 0
        left_gain = max(gain(node.left), 0)
        right_gain = max(gain(node.right), 0)
        # Price of new path with current node as highest apex
        price_newpath = node.val + left_gain + right_gain
        max_sum = max(max_sum, price_newpath)
        # Return maximum gain node can contribute to its parent
        return node.val + max(left_gain, right_gain)
    gain(root)
    return max_sum`,
      javascript: `function maxPathSum(root) {
  let maxSum = -Infinity;
  function maxGain(node) {
    if (!node) return 0;
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    const priceNewpath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewpath);
    return node.val + Math.max(leftGain, rightGain);
  }
  maxGain(root);
  return maxSum;
}`,
      java: `class Solution {
    private int maxSum = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }
    private int maxGain(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(maxGain(node.left), 0);
        int rightGain = Math.max(maxGain(node.right), 0);
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
      cpp: `#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    int maxSum = INT_MIN;
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int left = max(maxGain(node->left), 0);
        int right = max(maxGain(node->right), 0);
        maxSum = max(maxSum, node->val + left + right);
        return node->val + max(left, right);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return maxSum;
    }
};`,
    },
    sampleSolution: {
      language: "Python",
      code: `def maxPathSum(root):
    max_sum = float('-inf')
    def gain(node):
        nonlocal max_sum
        if not node:
            return 0
        # Ignore negative path contributions
        left_gain = max(gain(node.left), 0)
        right_gain = max(gain(node.right), 0)
        # Apex path sum through this node
        current_sum = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_sum)
        # For ancestor calls, we can only branch into one child
        return node.val + max(left_gain, right_gain)

    gain(root)
    return max_sum`,
      timeComplexity: "O(N) each node visited once in post-order traversal",
      spaceComplexity: "O(H) recursion stack where H is tree height",
      explanation:
        "Bottom-up DFS calculating maximum linear branch contribution from each child. If a subtree has negative sum, clamp to 0. At each node, evaluate the apex path sum crossing both children.",
    },
  },
];
