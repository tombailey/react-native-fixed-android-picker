package me.tombailey.fixedandroidpicker;

import android.app.AlertDialog;
import android.content.DialogInterface;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

public class FixedAndroidPickerModule extends ReactContextBaseJavaModule {

    public FixedAndroidPickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FixedAndroidPicker";
    }

    @ReactMethod
    public void showPickerDialog(ReadableArray labelsReadableArray, final Promise promise) {
        final String[] labels = getLabels(labelsReadableArray);
        new AlertDialog.Builder(getCurrentActivity())
            .setItems(labels, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int itemIndex) {
                    dialog.dismiss();
                    promise.resolve(itemIndex);
                }
            })
            .setOnCancelListener(new DialogInterface.OnCancelListener() {
                @Override
                public void onCancel(DialogInterface dialog) {
                    promise.reject("dialog was closed");
                }
            })
            .show();
    }

    private String[] getLabels(ReadableArray labelsReadableArray) {
        List<String> labels = new ArrayList<String>();
        for (int index = 0; index < labelsReadableArray.size(); index++) {
            labels.add(labelsReadableArray.getString(index));
        }
        return labels.toArray(new String[labels.size()]);
    }

}
