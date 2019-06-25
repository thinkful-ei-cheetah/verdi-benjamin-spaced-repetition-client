import React, { Component } from 'react'
import './DashboardRoute.css'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import LanguageApiService from '../../services/language-api-service'

class DashboardRoute extends Component {
  state = {
    language: {},
    words: [],
    error: null
  }

  async componentDidMount() {
    try {
      const dashboardData = await LanguageApiService.fetchOverview()
      this.setState({
        language: dashboardData.language,
        words: dashboardData.words
      })
    } catch(err) {
      this.setState({
        error: err.message
      })
    }
  }

  renderWordList = (words) => {
    return words.map((word, i) => {
      return (
        <li className='word' key={i}>
          <h4>{word.original}</h4>
          <div className='count'>
            <div className='correct'>
              correct answer count: {word.correct_count}
            </div>
            <div className='incorrect'>
              incorrect answer count: {word.incorrect_count}
            </div>
          </div>
        </li>
      )
    })
  }

  render() {
    const {language, words} = this.state;
    return (
      <section className='flex-grid dashboard-page'>
        <div className='col'>
          <h2>You're learning {language.name}</h2>
          <div className='total-score'>
            Total correct answers: {language.total_score}
          </div>
          <div className='words'>
            <h3>Words to practice</h3>
            <ul className='word-list raised'>  
              {this.renderWordList(words)}
            </ul>
          </div>

          <Link to='/learn'>
            <Button className='raised primary big'>
              Start practicing
            </Button>
          </Link>
        </div>        
      </section>
    );
  }
}

export default DashboardRoute
