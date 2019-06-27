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
    error: null
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
      console.error(err.message);
      this.setState({error: err.message})
    }
  }

  handleSubmit = () => {

  }

  render() {
    const {totalScore, wordCorrectCount, wordIncorrectCount, nextWord} = this.state;
    return (
      <section className='learn-page'>
        <div className='score-overview'>
          <p>Your total score is: {totalScore}</p>
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
        </div>

        <div className='guess-form-wrapper raised'>
          <div className='next-word'>
            <h2>Translate the word:</h2>
            <span>{nextWord}</span>
          </div>

          <form id='js-guess-form' onSubmit={this.handleSubmit}>
            <input type='text' name='guess' id='learn-guess-input' required />
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
      </section>
    );
  }
}

export default LearningRoute
