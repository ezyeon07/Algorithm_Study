//? 프로그래머스 레벨3 디스크컨트롤러

//= 테스트케이스
//= [[24, 10], [18, 39], [34, 20], [37, 5], [47, 22], [20, 47], [15, 34], [15, 2], [35, 43], [26, 1]], 74



    //! solution point
    // 우선순위 큐를 통해 해결하는 문제, 
    // 가장 최소의 평균시간을 구하려면, (당연하게도) 총 소요시간이 최소인 방법을 고민해야한다. 

    //* 총 소요시간이 최소가 되기 위해서는 요청이 들어 온 순서대로(=>배열 순서대로) 처리하는 것이 아니라
    //* 작업이 요청되는 시점(jobs[i][0])이 빠르고, 작업의 소요시간(jobs[i][1])이 짧은 것 순서대로 처리한다.

    // 1. jobs를 각 요소의 첫번째 요소(=>작업 요청 시점)를 기준으로 정렬을 하고
    // 2. 작업을 처리할 큐[work)를 하나 만들어 놓고, 작업을 처리하는 동안 들어오는 jobs의 모든 요청을 넣어준다. 
    // 2-1. 작업요청 시점이 같다면, 각 요소의 두번째 요소(=> 작업소요시간)을 기준으로 다시 정렬
    // 3. 큐의 길이가 0이 아니라면, 각 작업에 소요되는 시간(요청이 시작된 이후에 대기시간+작업소요시간)을 계산해서 answer에 더해주고 계산을 마친 요소는 work 큐에서 제거한다. 
    // 4. answer에는 총 소요시간이 계산되어 있으므로 평균은 answer을 jobs의 length로 나눈 값의 정수값만 리턴한다. 



const solution = (jobs) => {
    let answer = 0,
      j = 0,
      time = 0;
    jobs.sort((a, b) => a[0] - b[0]);
  
    const work = [];
    while (j < jobs.length || work.length !== 0) {
      if (jobs.length > j && time >= jobs[j][0]) {
        work.push(jobs[j++]);
        work.sort((a, b) => a[1] - b[1]);
        continue;
      }
      if (work.length !== 0) {
        time += work[0][1];
        answer += time - work[0][0];
        work.shift();
      } else {
        time = jobs[j][0];
      }
    }
    return parseInt(answer / jobs.length);
  };