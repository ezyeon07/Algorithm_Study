
// greedy로 안풀고 조합으로 풀면 아래와 같다.
function solution(number, k) {
    var answer = '';
    let arr = String(number).split('')
    
    let choice = arr.length-k

    function combination(arr, choice) {
        const result = [];
        if (choice === 1) return arr.map((el) => [el]);
        arr.forEach((el, idx, arr) => {
          const fixed = el;
          const restArr = arr.slice(idx + 1);
          const combinationArr = combination(restArr, choice - 1);
          const combineFix = combinationArr.map((el) => [fixed, ...el]);
          result.push(...combineFix);
        });
        return result
      }
    
    const pick = combination(arr,choice).map(el => el.join('')).sort((a,b) => a-b)
    
    answer = pick.slice(-1)[0]

    return answer;
}

// 이중우선순위 큐
function swap (idx1, idx2, arr) { // 인덱스의 순서를 바꾸기 위한 함수를 만들고
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}
function getParentIdx(idx) { // 부모의 인덱스를 찾기 위한 함수를 만들고 
  return Math.floor((idx-1)/2)
}

function solution(operations) {
      var answer = [];
      let queue = [];

      operations.forEach(el=> {  // operations를 순회하면서 다음을 수행
          if(el[0] === 'I') {
              queue.push(Number(el.slice(2)))

              // 큐에 요소를 넣고, 최소힙을 구현
              let curIdx = queue.length-1;
              let parentIdx = getParentIdx(curIdx)
              while (parentIdx >=0 && queue[curIdx] < queue[parentIdx]) {
                  swap(curIdx, parentIdx, queue)
                  curIdx = parentIdx;
                  parentIdx = getParentIdx(curIdx)
              }
          }
          if (el ==='D -1') {
              queue.shift()
          } else if (el === 'D 1') {
              queue.pop()
          }
      })

  // queue가 비어있는지 여부를 판단해서 결과값을 달리 반환
  if(queue.length) {
      answer=[Math.max(...queue), queue[0]]  
      //? 최소힙으로 정리를 하면 마지막 요소가 최대값이 아닌가?? 
      //? Math.max 대신 queue[queue.length-1]로하면 왜 테스트케이스6이 통과가 안되는지..
  } else {
      answer = [0, 0]
  }
  
  return answer;
}



// 디스크컨트롤러
const solution = (jobs) => {
  debugger;
let answer = 0;
  // 작업이 요청되는 시점을 기준으로 정렬
  jobs.sort((a, b) => a[0] - b[0]);

  const work = [jobs[0]];    
  
  for(let i=1; i<jobs.length; i++) {
      if(work[i-1][0] === jobs[i][0]) {
          work.push(jobs[i])
          work.sort((a,b) => a[1]-b[1])
      } else {
          work.push(jobs[i])
      }  
  }
  
  // 정렬한 값을 기준으로 시간을 계산하는 알고리즘을 구현하자. 
  let time = work[0][1]
  
  for(let j=1; j<work.length; j++) {
      time += work[j][1]
      console.log(time)
      answer += time - work[j][0]
      console.log(answer)
  }

  work.reverse()

  let totalTime = work.reduce((acc, cur) => acc+cur[1], 0)

  


  
  return parseInt(answer / jobs.length);
};