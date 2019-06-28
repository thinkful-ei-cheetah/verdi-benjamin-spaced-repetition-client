import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import LanguageApiService from '../../services/language-api-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    nextWord: '',
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
    error: null,
    guess: '',
    isCorrect: false,
    answer: '',
    prevWord: ''
  }

  async componentDidMount() {
    try {
      const res = await LanguageApiService.fetchNextWord()
      this.setState({
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        totalScore: res.totalScore
      })
    } catch(err) {
      this.setState({error: err.message})
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const guess = this.state.guess;
    try {
      const res = await LanguageApiService.submitGuess({guess});
      this.setState({
        prevWord: this.state.nextWord,
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        totalScore: res.totalScore,
        answer: res.answer,
        isCorrect: res.isCorrect
      })
    } catch(err) {
      this.setState({error: err.message})
    }
  }

  resetForm = () => {
    this.setState({
      guess: '',
      answer: '',
      isCorrect: false,
      prevWord: ''
    })
  }

  renderCorrectGuess = () => {
    const {isCorrect, answer, guess, totalScore, prevWord} = this.state
    if (isCorrect && answer) {
      return (
        <div className='guess correct raised'>
          <h2>You were correct! :D</h2>
          <div className='DisplayScore'>
            <p>Your total score is: {totalScore}</p>
          </div>
          <div className='DisplayFeedback'>
            <p>
              The correct translation for {prevWord} was {answer} and you chose {guess}!
            </p>
          </div>
          <Button className='raised primary big' onClick={this.resetForm}>
            Try another word!
          </Button>
        </div>
      )
    }
    return <></>
  }

  renderIncorrectGuess = () => {
    const {isCorrect, answer, guess, totalScore, prevWord} = this.state
    if (!isCorrect && answer) {
      return (
        <div className='guess incorrect raised'>
          <h2>Good try, but not quite right :(</h2>
          <div className='DisplayScore'>
            <p>Your total score is: {totalScore}</p>
          </div>
          <div className='DisplayFeedback'>
            <p>
              The correct translation for {prevWord} was {answer} and you chose {guess}!
            </p>
          </div>
          <Button className='raised primary big' onClick={this.resetForm}>
            Try another word!
          </Button>
        </div>
      )
    }
    return <></>
  }

  renderGuessForm = () => {
    const {nextWord, guess, isCorrect, answer} = this.state
    if (!isCorrect && !answer) {
      return (
        <div className='guess-form-wrapper raised'>
          <div className='next-word'>
            <h2>Translate the word:</h2>
            <span>{nextWord}</span>
          </div>
  
          <form id='js-guess-form' onSubmit={this.handleSubmit}>
            <input type='text' name='guess' id='learn-guess-input' required value={guess} onChange={(e) => this.setState({guess: e.target.value})} />
            <label htmlFor='learn-guess-input'>
              What's the translation for this word?
            </label>
            
            <div className='form-group'>
              <Button className='raised primary big' type='submit'>
                Submit your answer
              </Button>
            </div>
          </form>
        </div>
      )
    }
    return <></>
  }

  renderWordCountScore = () => {
    const {isCorrect, answer, wordCorrectCount, wordIncorrectCount, totalScore} = this.state
    if (!isCorrect && !answer) {
      return <>
        <p>Your total score is: {totalScore}</p>
        <p>You have answered this word correctly {wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
      </>
    }
    return <></>
  }

  render() {
    return (
      <section className='learn-page'>
        <div className='score-overview'>
          {this.renderWordCountScore()}
        </div>

        {this.renderCorrectGuess()}
        {this.renderIncorrectGuess()}
        {this.renderGuessForm()}
      </section>
    );
  }
}

export default LearningRoute
