package com.warehouse_app;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "warehouse_app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (savedInstanceState != null) {
      savedInstanceState.remove("android:support:fragments");
      savedInstanceState.remove("android:fragments");
    }
    super.onCreate(savedInstanceState);
  }
}