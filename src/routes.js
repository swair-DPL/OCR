import { createAppContainer, createStackNavigator } from 'react-navigation';

import Camera from './screens/camera';
import OCRView from './screens/OCRView';

const MainStack = createStackNavigator({ Camera, OCRView });

const Routes = createAppContainer(MainStack);

export default Routes;
