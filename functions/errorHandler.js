import {refresh} from './users.js'


function handle(error, statusCode) {
    console.log('ERROR OCCURED\n')
    console.log('\tStatus code: '+error.status)
    console.log('\tMessage: '+error.message)

    if (statusCode === 401) {
      console.log('Refreshing tokens...');
      refresh();
    }
}
