---
title: 5 Multivariate Probability Distributions
description: Mathematical Statistics - 7th Edition - Wackerly
categories:
 - ComputerScience
tags: AI 
---
```
용어 정리
strategy : 전략
complete : solution이 하나 존재 할 때 그 solution을 찾는 것이 보장되어 있는가?
optimal : 최단 경로(the least cost path)를 찾는 것이 보장되어 있는가?   


```

# Uniformed Search
## Agents
### Rational agents
- `Rational agent`는 명확한 선호도를 가지고 기대치를 통해 불확실성을 모델링하고, 모든 실행 가능한 행동 중 항상 자신에게 최적의 결과를 가져오도록 행동을 수행하도록 선택하는 agent이다.
### Reflex agents
- `Reflex agent`s는 현재 상태에 기반을 두어 다음 `action`을 선택하는 `agent`로 이 Action이 가져올 미래에 대해 고려하지 않는다.

### Planning agents
- `Planning agents`는 (가설화된) `sequences of action`에 기반을 두어 결정한다. 
- `World`가 `action`에 대응하여 어떻게 변해가는지에 대한 모델을 가지고 있다.

## Search 
### Search Problem
- `Search Problem`은 `state space`(상태 공간), `successor function`(후계 함수 action, cost 포함), `start state` (시작 상태) 및 `goal test`로 구성된다.
- 솔루션은 `start state`(시작 상태)를 `goal state`(목표 상태)로 변환하는 `sequenc of action`(plan)이다.

### State Space Graph
- `State space graph`는 `search problem`의 수학적 표현이다. `Node`들은 `state`를, `arcs`는 `action`을 나타내며 이것이 가르키는 `node`는 그 `action`의 결과이다. 
- Search graph에서 각 state는 한 번씩 등장한다. 
- 전체 그래프는 매우 크기 때문에 메모리에 거의 만들 수 없지만 유용한 아이디어이다.

### Search Tree
- `Root node`는 `start state`이고 자녀는 후계자에 해당된다.
- `Node`가 `state`를 표시하지만 이러한 `state`를 달성하는 계획에 해당된다.
- 대부분의 문제에서 우리는 절대 `tree` 전체를 만들 수 없습니다.

### State Space Graphs vs Search Trees
- `search tree`의 각 `node`는 `state space graph`의 전체 경로이다.
- 우리는 필요에 따라 `tree`를 만들고, 가능한 한 적게 만듭니다.

### Depth-First Search
- Strategy: expand a a deepest node first
- Implementation: Frontier is a LIFO stack
- **Properties** with depth `m` tree
  - time : $O(bm)$
  - space : $O(b^m)$
  - Is it complete?
    - m could be infinite, so only if we prevent cycles (more later)
  - Is it optimal?
    - No, it finds the “leftmost” solution

### Breath-Frist Search
- Strategy: expand a shallowest node first
- Implementation: Fringe is a FIFO queue
- **Properties** with depth `m`, shallowest solution's depth `s` tree
  - time : $O(b^s)$
  - space : $O(b^m)$
  - Is it complete?
    - Yes, s must be finite if a solution exists
  - Is it optimal?
    - If costs are equal

### Uniform Cost Search
- Strategy: expand a cheapest node first:
- Implementation: Fringe is a priority queue (priority: cumulative cost)
- **Properties** with depth `m`, solution costs $C^*$ and arcs cost at least $\epsilon$ 
  - time : $O(b^{C^*/\epsilon})$
  - space : $O(b^m)$
  - Is it complete?
    - Yes, Assuming best solution has a finite cost and minimum arc cost is positive    
  - Is it optimal?
    - Yes
- Explores options in every “direction”
- No information about goal location

    

