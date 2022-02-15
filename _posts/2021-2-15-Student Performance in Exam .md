---
title: \[KR\] Student Performance in Exam 시각화 & 검정
description: Analysis StudentsPerformance dataset from kaggle
categories:
 - R
tags: DataScience Statistics R
---

이 주제는 2021년 2학기 고려대학교 오찬욱 교수님의 통계계산프로그래밍(STAT204) 강의의 프로젝트 과제로 제출하였습니다.

***
# 목표

이 프로젝트의 목적은 다음 성별, 부모의 소득, 부모의 학력 수준과 시험 성적 사이에 유의미한 관계가 있는지에 대해 알아보는 것입니다. 

다음 세가지 주제를 선정하여 데이터를 분석해 보았습니다.
1. **성별**과 **시험 성적**의 관계
2. **부모의 소득**과 **시험 성적**의 관계
3. **부모의 학력 수준**과 **시험 성적**의 관계


StudentsPerformance 데이터셋은 math, reading, writing 3가지의 점수 변수를 가지고 있습니다. 

**gender**, **lunch**, **parental level of education** 변수별 성적 차이가 어떻게 나는지 알아보고 그 차이가 유의미한 차이인지 검정을 통해 확인합니다.

***
## 1. 성별과 시험 성적의 관계



```R
library(ggplot2)
library(tidyverse)
Students_ <- read.csv("../input/students-performance-in-exams/StudentsPerformance.csv")
head(Students_)
```

StudentsPerformance 데이터셋에서 원하는 변수들만 가져온 뒤, 남녀의 과목별 평균을 구해 그 차이를 비교합니다


```R
Students <- subset(Students_, select = c(-race.ethnicity,-test.preparation.course, -lunch,-parental.level.of.education))
colnames(Students) <-  c("Gender","Math_Score","Reading_Score","Writing_Score")

students <- Students %>% 
  pivot_longer(cols = c(Math_Score, Reading_Score, Writing_Score), names_to = "subject", values_to = "score") %>% 
  separate(subject, c("subject",NA))

gender_score <- students %>% 
  group_by(Gender, subject) %>% 
  summarise(
    avg.score = round(mean(score),1),
    std.score = round(sd(score),1),
    .groups = "drop"
  )
bp<-ggplot(gender_score,
       aes(
         x = subject,
         y = avg.score,
         fill = Gender
       )) +
  geom_bar(stat = "identity",
           position = "dodge",
           color = "black"
  ) +
  scale_fill_brewer(palette = "Pastel1") +
  geom_text(aes(label = avg.score),
            position = position_dodge(0.9),
            vjust = -0.2,
            size = 5) +
  ylim(0,100) +
  theme(
    axis.text = element_text(size = 15),
    axis.title = element_text(size = 20),
    legend.text = element_text(size = 12),
    legend.title = element_text(size = 15)
  )
plot(bp)
```

Math의 평균 점수는 남학생이 높았고 Reading, Writing의 평균 점수는 여학생이 높았습니다.

학생들의 점수 분포를 알아보기 위해 점수 구간을 10점 간격으로 나누고 학생 분표를 히스토그램으로 나타내 보았습니다.


```R
histogram <- students %>% 
  mutate( bin = cut_interval(score, n=10) )%>% 
  group_by(bin, Gender, subject) %>% 
  summarise(
    n = n(),
    .groups = "drop"
  )
```


```R

hist <- ggplot(histogram,
       aes(
         x = bin,
         y = n,
         fill = Gender
       )) +
  geom_bar(stat = "identity", 
           position = position_dodge2(preserve = "single"),
           color = "black",
           width = 0.8) +
  facet_wrap(~subject, nrow = 3) +
  scale_fill_brewer(palette = "Pastel1") +
  theme(
    axis.text.x = element_text(angle = 45, vjust = 0.6),
    axis.title.x = element_blank(),
    axis.text = element_text(size = 15),
    axis.title = element_text(size = 20),
    legend.text = element_text(size = 12),
    legend.title = element_text(size = 15),
    strip.text = element_text(size = 15)
  )

hist
```

Math 점수의 상위권엔 남학생의 비율이 높았고 Reading, Writing 점수의 상위권엔 여학생의 비율이 높았습니다.

학생수 차이에 의한 결과일 수도 있으니 남학생과 여학생 수를 비교해보았습니다.


```R
table(Students$Gender)
```

여학생이 51.8%, 남학생이 48.2%로 남녀의 비율엔 큰 차이가 없었습니다.

앞서 확인한 남녀 학생의 평균 점수 차이가 유의미한 차이인지 확인하기 위해 검정을 해보아야 합니다.

t-test를 진행하기 전 등분산 검정을 진행합니다.

$H_0\,:\,두\,집단의\,분산이\,같다.$

$H_1\,:\,두\,집단의\,분산이\,다르다.$


```R
var.test(Students$Math_Score ~ Students$Gender)
var.test(Students$Reading_Score ~ Students$Gender)
var.test(Students$Writing_Score ~ Students$Gender)
```

Math, Reading, Writing 모두 높은 p-value를 얻을 수 있었기 때문에 귀무가설을 귀각할 수 없습니다.

따라서 세 경우 모두 분산이 같다고 볼 수 있습니다.



위의 결과를 바탕으로 t-test 를 진행합니다.

$H_0\,:\,성별은\,학생의\,성적과\,관계가\,없다.$

$H_1\,:\,성별은\,학생의\,성적과\,관계가\,있다.$


```R
t.test(Students$Math_Score ~ Students$Gender,var.equal = TRUE)
t.test(Students$Reading_Score ~ Students$Gender,var.equal = TRUE)
t.test(Students$Writing_Score ~ Students$Gender,var.equal = TRUE)
```

세 경우 모두 매우 작은 p-value를 얻을 수 있었기 때문에 귀무가설을 기각할 수 있습니다.

따라서 성별에 따른 과목별 학생 성적의 차이는 유의미한 차이라고 볼 수 있습니다.

***
## 2. 부모의 소득과 시험 성적의 관계

StudentsPerformance 데이터셋은 lunch 변수를 가지고 있습니다. 

lunch 변수는 free/reduced, standard를 값으로 가집니다.  


```R
table(Students_$lunch)
```

위의 변수 값의 의미를 조사해본 결과 _free/reduced는 미국에서 연방정부에서 보상받을 수 있는 식사를 말하며 가족의 소득이 미국 연방 빈곤 문턱의 130~185% 사이일 때 자격이 있는 아동에게 제공된다_ 는 것을 알 수 있었습니다. 

따라서 lunch 변수를 가족의 소득 수준으로 해석하여 분석을 진행하였습니다.


```R
students <- subset(Students_, select = c(-race.ethnicity,-test.preparation.course, -gender,-parental.level.of.education))
colnames(students) <-  c("Lunch","Math_Score","Reading_Score","Writing_Score")
head(students)
```


```R
br <- ggplot(students, aes(Lunch, Reading_Score))
br <- br + geom_boxplot(fill='lavender')
br <- br + ggtitle("Reading scores by Lunch Boxplot")
br <- br + xlab("Lunch") + ylab("Reading Scores")
br

bw <- ggplot(students, aes(Lunch, Writing_Score))
bw <- bw + geom_boxplot(fill='lavender')
bw <- bw + ggtitle("Writing scores by Lunch Boxplot")
bw <- bw + xlab("Lunch") + ylab("Writing Scores")
bw

bm <- ggplot(students, aes(Lunch, Math_Score))
bm <- bm + geom_boxplot(fill='lavender')
bm <- bm + ggtitle("Math scores by Lunch Boxplot")
bm <- bm + xlab("Lunch") + ylab("Math Scores")
bm
```

Writing score, Math score, Reading score모두 standard에서 높은 분포를 가지고 있다는 것을 알 수 있었습다. 이들의 차이가 유의미한 차이인지 알기 위하여 학생들의 각 세 과목의 평균을 낸 mean.score 변수에 대해 t-test를 진행하였습니다. 

t-test를 진행하기 앞서 등분산 검정을 진행하였습니다.

$H_0\,:\,두\,집단의\,분산이\,같다.$

$H_1\,:\,두\,집단의\,분산이\,다르다.$


```R
students$avg.score =  round(apply(students[,c("Math_Score","Reading_Score","Writing_Score")],FUN = mean, MARGIN = 1),2)
var.test(students$avg.score ~ students$Lunch)

```

F Test 결과 p-value < 0.05 이기 때문에 귀무가설을 기각할 수 있습니다. 따라서 두 집단의 분산이 다르다고 볼 수 있습니다.

이 결과를 바탕으로 t-test를 진행합니다.

$H_0\,:\,부모의\,소득은\,학생의\,성적과\,관계가\,없다.$

$H_1\,:\,부모의\,소득은\,학생의\,성적과\,관계가\,있다.$


```R
t.test(students$avg.score ~ students$Lunch,var.equal = FALSE)

```

p-value < 2.2e-16 으로 p-value가 매우 작기 떄문에 귀무가설을 기각할 수 있습니다. 따라서 부모의 소득에 따른 학생 성적 평균의 차이는 유의미한 차이라고 볼 수 있다.  

***
## 3. 부모의 학력 수준과 시험 성적의 관계

**StudentsPerformance** 데이터셋은 **parental.level.of.education** 변수를 가지고 있습니다. 

parental.level.of.education 변수는 부모의 학력수준을 나타내는 변수로 **associate's degree, bachelor's degree, high school, master's degree, some college, some high school** 을 값으로 가집니다



```R
table(Students_$parental.level.of.education)
```

이번 EDA를 진행하였습니다.


```R
students <- subset(Students_, select = c(-race.ethnicity,-lunch,-gender,-test.preparation.course))
colnames(students) <-  c("Parent_Education","Math_Score","Reading_Score","Writing_Score")
students <- students %>% 
  pivot_longer(cols = c(Math_Score, Reading_Score, Writing_Score), names_to = "subject", values_to = "score") %>% 
  separate(subject, c("subject",NA))
students$Parent_Education <- factor(students$Parent_Education, levels = c("some high school", "high school", "some college", "associate's degree", "bachelor\'s degree", "master\'s degree"))
```


```R
edu_score<- students %>% 
  group_by(Parent_Education, subject) %>% 
  summarise(
    avg.score = round(mean(score),1),
    std.score = round(sd(score),1),
    .groups = "drop"
  )

gp <- ggplot(edu_score,
             aes(x = Parent_Education)) +
  geom_point(aes(y = avg.score), color = "tomato", shape = 18, size = 5) +
  geom_point(aes(y = std.score/0.2), color = "slategray3", shape = 20, size = 5) +
  scale_y_continuous(
    "avg.score",
    sec.axis = sec_axis(~. * 0.2, name = "std.score")
  ) +
  facet_wrap(~subject, nrow = 3) +
  theme(
    axis.text.x = element_text(angle = 10, vjust = 0.6),
    axis.text = element_text(size = 12),
    axis.title.x = element_text(size = 20),
    axis.title.y.left = element_text(size = 20, color = "tomato"),
    axis.title.y.right = element_text(size = 20, color = "slategray3"),
    legend.text = element_text(size = 12),
    legend.title = element_text(size = 15),
    strip.text = element_text(size = 15)
  )
gp
```


```R
histogram <- students %>% 
  mutate(bin = cut_interval(score, n=10)) %>% 
  group_by(bin, Parent_Education) %>% 
  summarise(
    n = n(),
    .groups = "drop"
  )

hist <- ggplot(histogram,
               aes(
                 x = bin,
                 y = n,
                 fill = Parent_Education
               )) +
  geom_bar(stat = "identity", 
           position = position_dodge2(preserve = "single"),
           color = "black",
           width = 0.8) +
  scale_fill_brewer(palette = "Pastel1") +
  theme(
    axis.text.x = element_text(angle = 45, vjust = 0.6),
    axis.title.x = element_blank(),
    axis.text = element_text(size = 15),
    axis.title = element_text(size = 20),
    legend.text = element_text(size = 12),
    legend.title = element_text(size = 15),
    strip.text = element_text(size = 15)
  ) 
hist
```

학부모들의 학력이 높아질수록 학생들의 평균점수는 세 과목 모두 상승하는 경향이 있음을 알 수 있었고, 학부모들의 학력이 높아질수록 학생들의 성적 분포가 상위권에 위치하게 된다는 것을 알 수 있습니다.

---
# 맺음말
#### 성별과 성적의 관계
- 데이터 시각화를 통해 여학생이 남학생보다 좋은 언어 능력(Reading, Writing)을 가지고 있고 남학생이 여학생보다 좋은 수학 능력을 가지고 있다는 가설을 세워 검정을 해본 결과 성별에 따른 과목별 점수 차이는 유의미한 차이라고 볼 수 있다고 말할 수 있습니다.


#### 학부모와 성적의 관계
- 학무모의 소득과 학생의 성적이 유의미한 관계가 있다는 것을 t-test를 통해 알 수 있었다.이것은 저소득층 학생들에게 동등한 교육의 기회가 주어지지 않는다는 것으로도 볼 수 있다고 생각합니다.
- 높은 학력을 가진 학부모의 자녀들의 성적이 비교적 상위권에 위치해있다는 것을 알 수 있었고 이것은 학부모의 교육에 대한 경험과 관심이 자녀들의 성적에 영향을 준 것이라고 생각합니다.


