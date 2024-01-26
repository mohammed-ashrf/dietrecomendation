import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras import layers, models

# Load your dataset (replace 'your_dataset.csv' with your actual dataset)
df = pd.read_csv('your_dataset.csv')

# Sample features (customize based on your dataset)
features = df[['age', 'gender', 'activity_level', 'dietary_preference', 'weight', 'height']]
labels = df['recommended_diet']

# Preprocess data
label_encoder = LabelEncoder()
features['gender'] = label_encoder.fit_transform(features['gender'])
features['activity_level'] = label_encoder.fit_transform(features['activity_level'])
features['dietary_preference'] = label_encoder.fit_transform(features['dietary_preference'])

# Normalize numerical features
scaler = StandardScaler()
features[['age', 'weight', 'height']] = scaler.fit_transform(features[['age', 'weight', 'height']])

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Build the model
model = models.Sequential([
    layers.Dense(64, activation='relu', input_shape=(features.shape[1],)),
    layers.Dense(32, activation='relu'),
    layers.Dense(len(df['recommended_diet'].unique()), activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f'Test accuracy: {test_acc}')
# Save the model
model.save('path_to_save_model')
# Make predictions for a new user
new_user_data = np.array([[25, 'Male', 'Active', 'Vegetarian', 70, 175]])  # Customize with your data
new_user_data[:, 1] = label_encoder.transform(new_user_data[:, 1])
new_user_data[:, 2] = label_encoder.transform(new_user_data[:, 2])
new_user_data[:, 3] = label_encoder.transform(new_user_data[:, 3])
new_user_data[:, [0, 4, 5]] = scaler.transform(new_user_data[:, [0, 4, 5]])

predictions = model.predict(new_user_data)
recommended_diet = label_encoder.inverse_transform(np.argmax(predictions))

print(f'Recommended Diet: {recommended_diet}')

